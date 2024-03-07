import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DietPlansService } from './diet-plans.service';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';
import { UpdateDietPlanDto } from './dto/update-diet-plan.dto';

@Controller('diet-plans')
export class DietPlansController {
  constructor(private readonly dietPlansService: DietPlansService) {}

  @Post()
  create(@Body() createDietPlanDto: CreateDietPlanDto) {
    return this.dietPlansService.create(createDietPlanDto);
  }

  @Get()
  findAll() {
    return this.dietPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDietPlanDto: UpdateDietPlanDto) {
    return this.dietPlansService.update(+id, updateDietPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietPlansService.remove(+id);
  }
}
