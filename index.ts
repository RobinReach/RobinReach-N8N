import { RobinReach } from './nodes/RobinReach/RobinReach.node';
import { RobinReachApi } from './credentials/RobinReachApi.credentials';

module.exports = {
  nodes: [RobinReach],
  credentials: [RobinReachApi],
};
