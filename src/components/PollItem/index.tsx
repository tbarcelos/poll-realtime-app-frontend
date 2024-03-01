import React from 'react';
import { Poll } from '../../services/poll';
import { Link } from 'react-router-dom';

type PollItemProps = {
  poll: Poll;
};

const PollItem: React.FC<PollItemProps> = ({ poll }) => {
  const totalVotes = poll.options?.reduce(
    (accumulator, option) => accumulator + option.votesCount || 0,
    0,
  );

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
      </th>
      <td className="px-6 py-4">{totalVotes}</td>
    </tr>
  );
};
export default PollItem;
