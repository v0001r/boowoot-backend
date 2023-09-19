import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
    private tenantIdentifier = 'x-tenant';

    constructor(
        @Inject(REQUEST) private readonly request: Request
    ) {}

    async getConnection(): Promise<Connection> {
        const tenant: string = this.request.headers[`${this.tenantIdentifier}`]?.toLowerCase()?.toString();

        if(!tenant) {
            throw new BadRequestException(`${this.tenantIdentifier} is not supplied in request header`);
        }

        // TODO: check if tenant is valid or not from common subscription API
        const tenants: string[] = ['a1space', 'a1miraki'];

        if (!tenants.includes(`${tenant}`)) {
            throw new BadRequestException(`${tenant} is not exist`);
        }
        
        const connection = mongoose.connections;
        const minu = new Date().getMinutes();
        const hr = new Date().getHours();
        const sec = new Date().getSeconds();

        const foundConn = connection.find((con: Connection) => {
          return con.name === this.request.headers[`${this.tenantIdentifier}`];
        });

        // console.log(
        //   hr,
        //   ':',
        //   minu,
        //   ':',
        //   sec,
        //   ' connection -> ',
        //   connection.length,
        //   this.request.headers[`${this.tenantIdentifier}`],
        // );
    
        if (foundConn && foundConn.readyState === 1) {
          return foundConn;
        }
    
        return await this.createConnection();
    }
    
    async createConnection(): Promise<Connection> {
        const connectionUri = `${process.env.MONGO_URI}/${this.request.headers[`${this.tenantIdentifier}`]}`;
        const connection = await mongoose.createConnection(connectionUri);
        return connection;
    }

    /**
     * Get the Tenant information from the request object
     *
     * @private
     * @static
     * @param {Request} req
     * @param {string} tenantIdentifier
     * @returns
     * @memberof TenancyCoreModule
     */
    private static getTenantFromRequest(
        request: Request,
        tenantIdentifier: string
    ) {
        let tenant = '';

        // Get the tenant id from the header
        tenant = request.headers[`${tenantIdentifier || ''}`.toLowerCase()]?.toString() ||
        '';

        // Validate if tenant id is present
        if (this.isEmpty(tenant)) {
            throw new BadRequestException(`${tenantIdentifier} is not supplied`);
        }
    
        return tenant;

    }

    /**
     * Check if the object is empty or not
     *
     * @private
     * @param {*} obj
     * @returns
     * @memberof TenancyCoreModule
     */
    private static isEmpty(obj: any) {
        return !obj || !Object.keys(obj).some((x) => obj[x] !== void 0);
    }
}
