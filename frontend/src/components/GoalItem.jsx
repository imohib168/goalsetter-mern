import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
    toast.success('Goal successfully deleted');
  };

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={onDelete} className='close'>
        X
      </button>
    </div>
  );
}

export default GoalItem;
