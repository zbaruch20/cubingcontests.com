import RoundResultsTable from './RoundResultsTable';
import { ICompetitionEvent, IEvent, IPerson, IRound } from '@sh/interfaces';
import { roundTypes } from '~/helpers/roundTypes';

const EventResults = ({
  event,
  events,
  persons,
  onDeleteResult,
}: {
  event: ICompetitionEvent | null;
  events: IEvent[];
  persons: IPerson[];
  onDeleteResult?: (personId: string) => void;
}) => {
  const rounds = event?.rounds.length > 0 ? [...event.rounds].reverse() : [];

  return (
    <>
      {rounds.map((round: IRound) => (
        <div key={round.roundTypeId}>
          <h3 className="mt-5 mb-4 fs-3">
            {`${events.find((el) => el.eventId === round.eventId)?.name} ${roundTypes[round.roundTypeId]}` || 'Error'}
          </h3>
          <RoundResultsTable round={round} events={events} persons={persons} onDeleteResult={onDeleteResult} />
        </div>
      ))}
    </>
  );
};

export default EventResults;
