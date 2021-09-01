/* eslint-disable react/prop-types */
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton } from 'antd';
import allActions from '../redux/actions/index';

const TeamList = lazy(() => import('../components/team/TeamList'));

const Teams = ({ teams }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.teams.teamData(teams));
  }, [teams, dispatch]);

  const clickHandler = (newTeam) => {
    if (newTeam !== null) {
      dispatch(allActions.teams.teamSelected(newTeam));
    }
  };
  return (
    <Suspense
      fallback={
        <div className="skeleton">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      }
    >
      <TeamList key="newTeam-list" clickHandler={clickHandler} teams={teams} />
    </Suspense>
  );
};

export default Teams;
