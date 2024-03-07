import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FitnessPlansService } from './fitness-plans.service';
import { CreateFitnessPlanDto } from './dto/create-fitness-plan.dto';
import { UpdateFitnessPlanDto } from './dto/update-fitness-plan.dto';

@Controller('fitness-plans')
export class FitnessPlansController {
  constructor(private readonly fitnessPlansService: FitnessPlansService) {}

  @Post()
  create(@Body() createFitnessPlanDto: CreateFitnessPlanDto) {
    return this.fitnessPlansService.create(createFitnessPlanDto);
  }

  @Get()
  findAll() {
    return this.fitnessPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFitnessPlanDto: UpdateFitnessPlanDto) {
    return this.fitnessPlansService.update(+id, updateFitnessPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessPlansService.remove(+id);
  }
}
