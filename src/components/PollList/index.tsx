import { useEffect, useState } from 'react';
import { load, Poll } from '../../services/poll';
import PollItem from '../PollItem';
import { useAuth } from '../../hooks/AuthContext';
import { extractErrorMessage } from '../../utils/handleApiError';
import Alert from '../Alert';

const PollList: React.FC = () => {
  const [data, setData] = useState<Poll[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const token = auth.user?.accessToken;

  useEffect(() => {
    setIsLoading(true);
    if (token)
      load(token)
        .then(async (response) => {
          setData(response);
        })
        .catch((e) => {
          setError(extractErrorMessage(e));
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [token]);

  return (
    <>
      {' '}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            List Polls
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {error && <Alert>{error}</Alert>}
                    {isLoading && <div>Loading...</div>}
                  </td>
                </tr>
                {data?.map((poll) => (
                  <PollItem key={poll.id} poll={poll}></PollItem>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};
export default PollList;
