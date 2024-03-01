import { FormEvent } from 'react';
import SearchIcon from './SearchIcon';

interface SearchProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const Searchbar: React.FC<SearchProps> = ({ isLoading, onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="group relative">
      <SearchIcon />
      <input
        className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none  text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        name="query"
        aria-label="Filter"
        placeholder="Filter..."
      />{' '}
      <button
        disabled={isLoading}
        type="submit"
        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
