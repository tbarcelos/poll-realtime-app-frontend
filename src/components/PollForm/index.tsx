import React, { useState } from 'react';
import InputField from '../InputField';
import { extractErrorMessage } from '../../utils/handleApiError';
import Alert from '../Alert';
import { create, ICreatePoll } from '../../services/poll';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const PollForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [optionCount, setOptionCount] = useState(1);

  const navigate = useNavigate();

  const auth = useAuth();
  const token = auth.user?.accessToken;

  const addOption = () => {
    setOptionCount(optionCount + 1);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const optionInputs = Array.from({ length: optionCount }, (_, index) => (
    <InputField
      key={index}
      id={`option-${index}`}
      name={`option-${index}`}
      type="text"
      autoComplete="option"
      required
      label={`Option ${index + 1}`}
      placeholder={`Enter option ${index + 1}`}
      change={(e) => handleOptionChange(index, e.target.value)}
    />
  ));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const poll: ICreatePoll = {
      title: title,
      options: options,
    };

    try {
      if (token) {
        const newPoll = await create(poll, token);
        if (newPoll) navigate('/');
      }
    } catch (e) {
      setError(extractErrorMessage(e));
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Poll
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="relative overflow-x-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <Alert>{error}</Alert>}
              <InputField
                id="title"
                name="tile"
                type="text"
                autoComplete="title"
                required
                label="Title"
                placeholder="Enter the title"
                change={(e) => setTitle(e.target.value)}
              />
              <div>{optionInputs}</div>

              <div>
                <button
                  type="button"
                  onClick={addOption}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New Option
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default PollForm;
