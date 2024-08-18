import { ssrFetch } from '~/helpers/fetchUtils';
import ContestLayout from '@c/ContestLayout';
import ContestResults from '@c/ContestResults';
import C from '@sh/constants';
import { IContestData } from '@sh/types';

const ContestResultsPage = async ({
  params: { id },
  searchParams: { eventId },
}: {
  params: { id: string };
  searchParams: { eventId?: string };
}) => {
  const { payload: contestData }: { payload?: IContestData } = await ssrFetch(
    `/competitions/${id}?eventId=${eventId ?? 'FIRST_EVENT'}`,
    { revalidate: C.contestResultsRev },
  );
  if (!contestData) return <h3 className="mt-4 text-center">Contest not found</h3>;

  return (
    <ContestLayout contest={contestData.contest} activeTab="results">
      <ContestResults
        contest={contestData.contest}
        persons={contestData.persons}
        activeRecordTypes={contestData.activeRecordTypes}
      />
    </ContestLayout>
  );
};

export default ContestResultsPage;
