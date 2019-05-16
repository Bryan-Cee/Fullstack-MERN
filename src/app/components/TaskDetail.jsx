import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

export const TaskDetail = (
  { id,
    comments,
    task,
    isComplete,
    groups,
    setTaskCompletion,
    setTaskGroup,
    setTaskName
  }
) => {
  return (
    <div>
      <div>
        <input value={task.name} onChange={ setTaskName } readOnly={false}/>
      </div>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Complete'}</button>
      </div>
      <div>
        <select onChange={ setTaskGroup } value={task.group}>
          {groups.map(group => (
            <option key={group.id} value={group.id}  >{group.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Link to='/dashboard'>
          <button>Done</button>
        </Link>
      </div>
    </div>
  );

};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let groups = state.groups;

  return { id, task, groups, isComplete: task.isComplete }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion: function (id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete))
    },
    setTaskGroup: function (e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName: function (e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);

