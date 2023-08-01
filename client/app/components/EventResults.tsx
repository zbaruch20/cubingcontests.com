import RoundResultsTable from './RoundResultsTable';
import { ICompetitionEvent, IEvent, IPerson, IRound } from '@sh/interfaces';
import { roundFormats } from '~/helpers/roundFormats';
import { roundTypes } from '~/helpers/roundTypes';

const EventResults = ({
  compEvent,
  persons,
  onDeleteResult,
}: {
  compEvent: ICompetitionEvent | null;
  persons: IPerson[];
  onDeleteResult?: (personId: string) => void;
}) => {
  const rounds = compEvent?.rounds.some((el) => el.results.length > 0) ? [...compEvent.rounds].reverse() : [];

  return (
    <div className="my-5">
      {rounds.map((round: IRound) =>
        round.results.length === 0 ? (
          <h5 key={round.roundTypeId} className="mb-4">
            {roundTypes[round.roundTypeId].label}&nbsp;format:&#8194;<b>{roundFormats[round.format].label}</b>
          </h5>
        ) : (
          <div key={round.roundTypeId} className="mb-4">
            <h3 className="mx-2 mb-4 fs-3">{`${compEvent.event.name} ${roundTypes[round.roundTypeId].label}`}</h3>
            <RoundResultsTable
              round={round}
              event={compEvent.event}
              persons={persons}
              onDeleteResult={onDeleteResult}
            />
          </div>
        ),
      )}
    </div>
  );
};

export default EventResults;
