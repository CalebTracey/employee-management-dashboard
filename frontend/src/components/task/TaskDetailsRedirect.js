/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Skeleton, Space } from 'antd';
import allActions from '../../redux/actions/index';
import apiGet from '../../apis/apiGet';
import useGetEmployees from '../../hooks/useGetEmployees';
import useGetTeams from '../../hooks/useGetTeams';
import useGetTeamTasks from '../../hooks/useGetTeamTasks';

const TaskDetailsRedirect = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, getEmployees] = useGetEmployees({ data: null });
  const [teamsRes, getTeams] = useGetTeams({ data: null });
  const [, getTeamTasks] = useGetTeamTasks({ data: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      apiGet({ url: `team_tasks/${parseInt(id, 10)}` })
        .then((res) => {
          dispatch(allActions.teams.teamTaskSelected(res.data));
        })
        .then(() => {
          getTeams();
          getEmployees();
          getTeamTasks();
        });
    };
    if (!teamsRes.isLoading) getData();
    return () => {
      setIsLoading(false);
    };
  }, [id, dispatch, getTeams, getEmployees, getTeamTasks, teamsRes]);

  return !isLoading ? (
    <Redirect to={`/EMapp/task/${id}`} />
  ) : (
    <Space style={{ margin: '2rem' }}>
      <div className="skeleton">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    </Space>
  );
};

export default TaskDetailsRedirect;
