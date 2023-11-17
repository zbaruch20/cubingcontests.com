import {
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  Min,
  Max,
  MinLength,
  ValidateNested,
  IsEmail,
  ValidateIf,
  IsNotEmpty,
  ArrayMaxSize,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { nonOnlineCountryCodes } from '@sh/Countries';
import { Color, ContestType, RoundFormat, RoundProceed, RoundType } from '@sh/enums';
import {
  IPerson,
  ICompetitionDetails,
  IContestEvent,
  IContest,
  IEvent,
  IRound,
  IProceed,
  IResult,
  ISchedule,
  IVenue,
  IRoom,
  IActivity,
  IMeetupDetails,
} from '@sh/interfaces';
import { CreateEventDto } from '@m/events/dto/create-event.dto';
import { CreatePersonDto } from '@m/persons/dto/create-person.dto';
import { CreateResultDto } from '@m/results/dto/create-result.dto';
import { getMinLengthOpts, invalidCountryOpts } from '~/src/helpers/validation';
import C from '@sh/constants';

const activityCodeRegex = /^[a-z0-9][a-z0-9-_]{2,}$/;

export class CreateContestDto implements IContest {
  @IsString()
  @MinLength(5, getMinLengthOpts('contest ID', 5))
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'The contest ID must only contain alphanumeric characters' })
  competitionId: string;

  @IsString()
  @MinLength(10, getMinLengthOpts('contest name', 10))
  name: string;

  @IsEnum(ContestType)
  type: ContestType;

  @ValidateIf((obj) => obj.type !== ContestType.Online)
  @IsString()
  @IsNotEmpty({ message: 'Please enter the city' })
  city?: string;

  @IsIn(nonOnlineCountryCodes, invalidCountryOpts)
  countryIso2: string;

  @ValidateIf((obj) => obj.type !== ContestType.Online)
  @IsString()
  venue?: string;

  @ValidateIf((obj) => obj.type !== ContestType.Online)
  @IsString()
  address?: string;

  @ValidateIf((obj) => obj.type !== ContestType.Online)
  @IsInt({ message: 'Please enter a valid latitude' })
  @Min(-90000000, { message: 'The latitude cannot be less than -90 degrees' })
  @Max(90000000, { message: 'The latitude cannot be more than 90 degrees' })
  latitudeMicrodegrees?: number;

  @ValidateIf((obj) => obj.type !== ContestType.Online)
  @IsInt({ message: 'Please enter a valid longitude' })
  @Min(-180000000, { message: 'The longitude cannot be less than -180 degrees' })
  @Max(180000000, { message: 'The longitude cannot be more than 180 degrees' })
  longitudeMicrodegrees?: number;

  @IsDateString({}, { message: 'Please enter a valid start date' })
  startDate: Date;

  @ValidateIf((obj) => obj.type === ContestType.Competition)
  @IsDateString({}, { message: 'Please enter a valid end date' })
  endDate?: Date;

  @ArrayMinSize(1, { message: 'Please enter at least one organizer' })
  @ValidateNested({ each: true })
  @Type(() => CreatePersonDto)
  organizers: IPerson[];

  @IsOptional()
  @IsEmail()
  contact?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateIf((obj) => obj.type === ContestType.Competition || obj.competitorLimit)
  @IsInt({ message: 'Please enter a valid competitor limit' })
  @Min(C.minCompetitorLimit, { message: `The competitor limit cannot be less than ${C.minCompetitorLimit}` })
  competitorLimit?: number;

  @ArrayMinSize(1, { message: 'Please select at least one event' })
  @ValidateNested({ each: true })
  @Type(() => ContestEventDto)
  events: IContestEvent[];

  @ValidateIf((obj) => obj.type === ContestType.Competition)
  @ValidateNested()
  @Type(() => CompetitionDetailsDto)
  compDetails?: ICompetitionDetails;

  @ValidateIf((obj) => obj.type !== ContestType.Competition)
  @ValidateNested()
  @Type(() => MeetupDetailsDto)
  meetupDetails?: IMeetupDetails;
}

////////////////////////////////////////////////////////////////////////////////////////////
// COMPETITION DETAILS
////////////////////////////////////////////////////////////////////////////////////////////

class CompetitionDetailsDto implements ICompetitionDetails {
  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule: ISchedule;
}

class MeetupDetailsDto implements IMeetupDetails {
  @IsDateString({}, { message: 'Please enter a valid start time' })
  startTime: Date;
}

class ScheduleDto implements ISchedule {
  @IsString()
  @IsNotEmpty()
  competitionId: string;

  @IsDateString()
  startDate: Date;

  @IsInt()
  @Min(1)
  numberOfDays: number;

  @ArrayMinSize(1, { message: 'Please enter at least one venue' })
  @ValidateNested({ each: true })
  @Type(() => VenueDto)
  venues: IVenue[];
}

class VenueDto implements IVenue {
  @IsInt()
  @Min(1)
  id: number;

  // This is required, even though the venue name above is not (this is intentional)
  @IsString()
  name: string;

  @IsInt()
  @Min(-90000000)
  @Max(90000000)
  latitudeMicrodegrees: number;

  @IsInt()
  @Min(-180000000)
  @Max(180000000)
  longitudeMicrodegrees: number;

  @IsIn(nonOnlineCountryCodes)
  countryIso2: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @ArrayMinSize(1, { message: 'Please enter at least one room' })
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  rooms: IRoom[];
}

class RoomDto implements IRoom {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Color)
  color: Color;

  @ArrayMinSize(1, { message: 'Please enter at least one activity' })
  @ValidateNested({ each: true })
  @Type(() => ActivityDto)
  activities: IActivity[];
}

class ActivityDto implements IActivity {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Matches(activityCodeRegex)
  activityCode: string;

  @ValidateIf((obj) => obj.activityCode === 'other-misc')
  @IsString()
  name?: string;

  @IsDateString({}, { message: 'Please enter valid activity start times' })
  startTime: Date;

  @IsDateString({}, { message: 'Please enter valid activity end times' })
  endTime: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActivityDto)
  childActivity?: IActivity[];
}

////////////////////////////////////////////////////////////////////////////////////////////
// COMPETITION EVENT
////////////////////////////////////////////////////////////////////////////////////////////

class ContestEventDto implements IContestEvent {
  @ValidateNested()
  @Type(() => CreateEventDto)
  event: IEvent;

  @ArrayMinSize(1, { message: 'Please enter at least one round for each event' })
  @ArrayMaxSize(C.maxRounds, { message: `You cannot hold more than ${C.maxRounds} rounds for one event` })
  @ValidateNested({ each: true })
  @Type(() => RoundDto)
  rounds: IRound[];
}

class RoundDto implements IRound {
  @IsString()
  @Matches(activityCodeRegex)
  roundId: string;

  @IsString()
  @IsNotEmpty()
  competitionId: string;

  @IsEnum(RoundType)
  roundTypeId: RoundType;

  @IsEnum(RoundFormat)
  format: RoundFormat;

  @ValidateIf((obj) => obj.roundTypeId !== RoundType.Final)
  @ValidateNested()
  @Type(() => ProceedDto)
  proceed?: IProceed;

  @ValidateNested({ each: true })
  @Type(() => CreateResultDto)
  results: IResult[];
}

class ProceedDto implements IProceed {
  @IsEnum(RoundProceed)
  type: RoundProceed;

  @IsInt({ message: 'Please enter valid round proceed values' })
  @Min(1, { message: 'The round proceed value must be at least 1' })
  value: number;
}
