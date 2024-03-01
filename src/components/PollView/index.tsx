import { useEffect, useState } from 'react';
import { getVote, setVote } from '../../utils/voteSession';
import {
  get,
  incrementVote,
  IUpdateVote,
  Poll,
  Option,
} from '../../services/poll';
import { useAuth } from '../../hooks/AuthContext';
import { useParams } from 'react-router-dom';
import { extractErrorMessage } from '../../utils/handleApiError';
import Alert from '../Alert';
import PollChart from '../PollChart';
import { useSocket } from '../../hooks/SocketContext';

export default function PollView() {
  const { pollId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [poll, setPoll] = useState<Poll | undefined>();
  const { getPollById } = useSocket();

  const [optionId, setOptionId] = useState<string | undefined>(
    pollId ? getVote(pollId) || '' : '',
  );
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(
    pollId ? (getVote(pollId) ? true : false) : false,
  );

  const auth = useAuth();
  const token = auth.user?.accessToken;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionId((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setIsLoading(true);
    if (token && pollId)
      get(parseInt(pollId), token)
        .then(async (response) => {
          setPoll(response);
        })
        .catch((e) => {
          setError(extractErrorMessage(e));
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [pollId, token]);

  useEffect(() => {
    if (optionId && pollId && getVote(pollId) !== optionId) {
      const updateVote: IUpdateVote = {
        optionId: parseInt(optionId),
        pollId: parseInt(pollId),
      };

      if (token) {
        incrementVote(updateVote, token)
          .then(async (response) => {
            setPoll(response);
          })
          .catch((e) => {
            setError(extractErrorMessage(e));
          })
          .finally(() => {
            setIsLoading(false);
          });

        setVote(pollId, optionId.toString());
        setIsDisabled(true);
      }
    }
  }, [optionId]);

  useEffect(() => {
    if (pollId) setPoll(getPollById(pollId));
  }, [getPollById]);

  const extractVotes = (options: Option[]): Array<number> => {
    return options.map((option) => option.votesCount);
  };

  const extractTitles = (options: Option[]): Array<string> => {
    return options.map((option) => option.title);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-black">{poll?.title}</h2>
        <div className="relative overflow-x-auto">
          <hr className="mt-4"></hr>
          {error && <Alert>{error}</Alert>}
          {isLoading && <div>Loading...</div>}
          {poll?.options?.map((option, index) => (
            <div key={index} className="flex items-center mt-4">
              <label
                htmlFor={option.id}
                className={`text-2xl text-gray-700 ${isDisabled ? 'bg-slate-50 text-slate-500 border-slate-200 shadow-none' : ''}`}
              >
                <input
                  type="radio"
                  id={option.id}
                  name="pollOption"
                  value={option.id}
                  checked={optionId == option.id}
                  onChange={handleChange}
                  className={`mr-2 form-radio text-blue-500 ${isDisabled ? 'bg-slate-50 text-slate-500 border-slate-200 shadow-none' : ''}`}
                  disabled={isDisabled}
                />

                {option.title}
              </label>
            </div>
          ))}
          <hr className="mt-4"></hr>
          {poll && poll.options && (
            <PollChart
              options={extractTitles(poll?.options)}
              votes={extractVotes(poll?.options)}
            />
          )}
        </div>
      </div>
    </>
  );
}
