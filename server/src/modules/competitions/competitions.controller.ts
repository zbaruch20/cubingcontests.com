import { Controller, Get, Post, Patch, Param, Request, Body, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { find } from 'geo-tz';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { CompetitionsService } from './competitions.service';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { AuthenticatedGuard } from '~/src/guards/authenticated.guard';
import { Roles } from '~/src/helpers/roles.decorator';
import { Role } from '~/src/helpers/enums';
import { RolesGuard } from '~/src/guards/roles.guard';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly service: CompetitionsService) {}

  // GET /competitions?region=Region
  @Get()
  async getCompetitions(@Query('region') region: string) {
    console.log('Getting competitions');
    return await this.service.getCompetitions(region);
  }

  // GET /competitions/mod
  @Get('mod')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  async getModCompetitions(@Request() req: any) {
    console.log('Getting competitions');
    return await this.service.getModCompetitions(req.user.personId, req.user.roles);
  }

  // GET /competitions/timezone
  @Get('timezone')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  async getTimezone(@Query('latitude') latitude: number, @Query('longitude') longitude: number) {
    console.log('Getting timezone');
    return { timezone: find(latitude, longitude)[0] };
  }

  // GET /competitions/:id
  @Get(':id')
  async getCompetition(@Param('id') competitionId: string) {
    console.log(`Getting competition with id ${competitionId}`);
    return await this.service.getCompetition(competitionId);
  }

  // GET /competitions/mod/:id
  @Get('mod/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  async getModCompetition(@Param('id') competitionId: string) {
    console.log(`Getting competition with id ${competitionId} with moderator info`);
    return await this.service.getModCompetition(competitionId);
  }

  // POST /competitions
  @Post()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  async createCompetition(
    @Request() req: any, // this is passed in by the guards
    @Body(new ValidationPipe()) createCompetitionDto: CreateCompetitionDto,
  ) {
    console.log('Creating competition');
    return await this.service.createCompetition(createCompetitionDto, req.user.personId);
  }

  // PATCH /competitions/:id?action=change_state/post_results
  @Patch(':id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateCompetition(
    @Param('id') competitionId: string,
    @Request() req: any, // this is passed in by the guards
    @Body(new ValidationPipe()) updateCompetitionDto: UpdateCompetitionDto,
    @Query('action') action?: 'change_state' | 'post_results',
  ) {
    if (!action) {
      console.log(`Updating competition ${competitionId}`);
      return await this.service.updateCompetition(competitionId, updateCompetitionDto, req.user.roles);
    } else if (action === 'post_results') {
      console.log(`Posting results for ${competitionId}`);
      return await this.service.postResults(competitionId, updateCompetitionDto);
    } else if (action === 'change_state') {
      console.log(`Setting state ${updateCompetitionDto.state} for competition ${competitionId}`);
      return await this.service.updateState(competitionId, updateCompetitionDto.state, req.user.roles);
    }
  }

  // DELETE /competitions/:id
  // @Delete(':id')
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  // @Roles(Role.Admin)
  // async deleteCompetition(@Param('id') competitionId: string) {
  //   console.log(`Deleting competition with id ${competitionId}`);
  //   return await this.service.deleteCompetition(competitionId);
  // }
}
