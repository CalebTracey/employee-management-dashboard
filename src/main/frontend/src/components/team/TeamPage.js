import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import allActions from '../../redux/actions/index';
import TeamDetails from './details/TeamDetails';
import api from '../../apis/api';

const { confirm } = Modal;

const TeamPage = () => {
  const team = useSelector((state) => state.teams.teamSelected);
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteTeam = async (team) => {
    await api
      .delete(`teams/${team.id}`)
      .then(() => dispatch(allActions.teams.teamDeleted(team.id)))
      .catch((error) => {
        console.log(error);
      });
    history.push(`team-deleted/${team.id}`);
    // <Redirect to={`team-deleted/${deletedTeam.id}`} />;
  };

  const showDeleteTeamConfirm = () => {
    confirm({
      title: `Delete ${team.teamName} ?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This is permanent!',
      onOk() {
        deleteTeam(team);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // const handleCreateTask = () => {
  //   console.log('row clicked');
  // };

  // const handleTaskOk = () => {
  //   setModalText('The modal will be closed after two seconds');
  //   setConfirmLoading(true);
  // };

  // const handleTaskCancel = () => {
  //   console.log('Clicked cancel button');
  //   setVisible(false);
  // };

  return (
    <TeamDetails
      showDeleteTeamConfirm={showDeleteTeamConfirm}
      team={team}
      data-testid="team-page"
    />
  );
};

export default TeamPage;
