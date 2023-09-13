import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

import { RewardApi } from '@/api';
import Table from '@/components/Table';
import useToast from '@/utils/useToast';
import { RewardHeaders } from '@/utils';
import LoadingScreen from '@/components/LoadingScreen';

const Orders = () => {
  document.title = "Rewards | Vaultik - Brands Dashboard";
  const navigate = useNavigate();
  const showToast = useToast();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(5);
  const [rewardList, setRewardList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const _data = await RewardApi.getRewards(page);
        setRewardList(_data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showToast(error.toString(), "error");
        setInvalid(true);
      }
    }

    fetchRewards();
  }, []);

  const handleAddReward = () => {
    navigate("/rewards/add-reward");
  }

  const onUpdateData = async (rewardId, header) => {
    if (header === "isActive") {
      const _rewards = rewardList.filter(_reward => _reward.id === rewardId);
      if (_rewards.length <= 0) {
        showToast("Could not activate the selected reward", "error");
        return;
      }

      const _reward = _rewards[0];

      try {
        await RewardApi.updateReward({ ..._reward, isActive: !_reward.isActive });
        setRewardList(rewardList.map(reward => (reward.id !== rewardId
          ? reward : {
            ...reward,
            isActive: !reward.isActive
          }
        )))

        showToast("Reward was successfully updated.");

      } catch (error) {
        showToast(error.toString(), "error");
      }
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="page-content">
      <Container fluid>
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Rewards</h3>
          </div>
          {/* <input
            className="orders-search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          <Button color="primary" onClick={handleAddReward}>
            Add Reward
          </Button>
        </div>

        <div className="table-responsive border-1 p-2">
          <Table headers={RewardHeaders} data={rewardList} updateData={onUpdateData} />
        </div>
      </Container>
    </div>
  )
}

export default Orders;
