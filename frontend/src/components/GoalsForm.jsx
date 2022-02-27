import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { createGoal, getGoals } from './../features/goals/goalSlice';

function GoalsForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error('Please enter your goal');
      return;
    }

    dispatch(createGoal({ text }));
    setText('');
    dispatch(getGoals());
    toast.success('Goal successfully added');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalsForm;
