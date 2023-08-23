import { EventFormat, EventGroup, RoundFormat } from '@sh/enums';
import { IEvent } from '@sh/interfaces';

// Official WCA events + 3x3x3 Team-Blind + 3x3x3 Team Factory. THIS IS TEMPORARY UNTIL EVENT CREATION IS ADDED.
export const eventsSeed: IEvent[] = [
  ///////////////////////////////////////////////////////////////////
  // WCA
  ///////////////////////////////////////////////////////////////////
  {
    eventId: '333',
    name: '3x3x3 Cube',
    rank: 10,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '222',
    name: '2x2x2 Cube',
    rank: 20,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '444',
    name: '4x4x4 Cube',
    rank: 30,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '555',
    name: '5x5x5 Cube',
    rank: 40,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '666',
    name: '6x6x6 Cube',
    rank: 50,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Mean,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '777',
    name: '7x7x7 Cube',
    rank: 60,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Mean,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '333bf',
    name: '3x3x3 Blindfolded',
    rank: 70,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf3,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '333fm',
    name: '3x3x3 Fewest Moves',
    rank: 80,
    format: EventFormat.Number,
    defaultRoundFormat: RoundFormat.Mean,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '333oh',
    name: '3x3x3 One-Handed',
    rank: 90,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: 'clock',
    name: 'Clock',
    rank: 110,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: 'minx',
    name: 'Megaminx',
    rank: 120,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: 'pyram',
    name: 'Pyraminx',
    rank: 130,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: 'skewb',
    name: 'Skewb',
    rank: 140,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: 'sq1',
    name: 'Square-1',
    rank: 150,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '444bf',
    name: '4x4x4 Blindfolded',
    rank: 160,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf3,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '555bf',
    name: '5x5x5 Blindfolded',
    rank: 170,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf3,
    groups: [EventGroup.WCA],
  },
  {
    eventId: '333mbf',
    name: '3x3x3 Multi-Blind',
    rank: 180,
    format: EventFormat.Multi,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.WCA, EventGroup.SubmissionsAllowed],
  },
  ///////////////////////////////////////////////////////////////////
  // UNOFFICIAL
  ///////////////////////////////////////////////////////////////////
  {
    eventId: '333tbf',
    name: '3x3x3 Team-Blind',
    rank: 1000,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial, EventGroup.Team],
    participants: 2,
  },
  {
    eventId: 'fto',
    name: 'Face-turning Octahedron',
    rank: 1010,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial],
  },
  {
    eventId: 'magic',
    name: 'Magic',
    rank: 1020,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial],
  },
  {
    eventId: 'mmagic',
    name: 'Master Magic',
    rank: 1030,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial],
  },
  {
    eventId: '333ohbfr',
    name: '3x3x3 + OH + BLD Team Relay',
    rank: 1040,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.Unofficial, EventGroup.SubmissionsAllowed, EventGroup.Team],
    participants: 3,
  },
  {
    eventId: '333tf',
    name: '3x3x3 Team Factory',
    rank: 1050,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial, EventGroup.Team],
    participants: 2,
  },
  {
    eventId: '333ft',
    name: '3x3x3 With Feet',
    rank: 1060,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Unofficial],
  },
  ///////////////////////////////////////////////////////////////////
  // REMOTE-ONLY
  ///////////////////////////////////////////////////////////////////
  {
    eventId: '333mbo',
    name: '3x3x3 Multi-Blind Old Style',
    rank: 2000,
    format: EventFormat.Multi,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.SubmissionOnly],
  },
  {
    eventId: '333bf2mr',
    name: '3x3x3 Blindfolded 2-Man Relay',
    rank: 2010,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.SubmissionOnly, EventGroup.Team],
    participants: 2,
  },
  {
    eventId: '333bf3mr',
    name: '3x3x3 Blindfolded 3-Man Relay',
    rank: 2020,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.SubmissionOnly, EventGroup.Team],
    participants: 3,
  },
  {
    eventId: '333bf4mr',
    name: '3x3x3 Blindfolded 4-Man Relay',
    rank: 2030,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.SubmissionOnly, EventGroup.Team],
    participants: 4,
  },
  {
    eventId: '333bf8mr',
    name: '3x3x3 Blindfolded 8-Man Relay',
    rank: 2040,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.BestOf1,
    groups: [EventGroup.SubmissionOnly, EventGroup.Team],
    participants: 8,
  },
  ///////////////////////////////////////////////////////////////////
  // REMOVED
  ///////////////////////////////////////////////////////////////////
  {
    eventId: '333tbfo',
    name: '3x3x3 Team-Blind Old Style',
    rank: 3000,
    format: EventFormat.Time,
    defaultRoundFormat: RoundFormat.Average,
    groups: [EventGroup.Removed, EventGroup.Team],
  },
];
