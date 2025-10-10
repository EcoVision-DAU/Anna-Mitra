const catchAsync = require('../utils/catchAsync');

const getDashboard = catchAsync(async (req, res) => {
  const stats = { openTasks: 3, completedTasks: 8, joinedNgos: 2 };
  const upcoming = [
    { _id: 't1', title: 'Distribute meal kits', ngoId: 'ngo1', ngoName: 'Helping Hands', dueDate: '2025-10-12', status: 'Pending' },
    { _id: 't2', title: 'Assist at food camp', ngoId: 'ngo2', ngoName: 'Green Earth', dueDate: '2025-10-14', status: 'In Progress' }
  ];
  const joinedNgos = [
    { _id: 'ngo1', name: 'Helping Hands', tagline: 'Feeding the hungry' },
    { _id: 'ngo2', name: 'Green Earth', tagline: 'Planting for a better future' }
  ];
  res.render('volunteer/dashboard', { volunteer: req.user, stats, upcoming, joinedNgos });
});

const getAssignedTasks = catchAsync(async (req, res) => {
  const tasks = [
    { _id: 't1', title: 'Distribute meal kits', ngoName: 'Helping Hands', dueDate: '2025-10-12', status: 'Pending', notes: 'Meet at main gate 9am' },
    { _id: 't2', title: 'Assist at food camp', ngoName: 'Green Earth', dueDate: '2025-10-14', status: 'In Progress', notes: 'Bring gloves & mask' },
    { _id: 't3', title: 'Pick-up donations', ngoName: 'Helping Hands', dueDate: '2025-10-18', status: 'Completed', notes: 'Warehouse #3' }
  ];
  res.render('volunteer/assigned-tasks', { volunteer: req.user, tasks });
});

const getJoinedNgos = catchAsync(async (req, res) => {
  const joined = [
    { _id: 'ngo1', name: 'Helping Hands', since: '2025-08-01', role: 'Volunteer' },
    { _id: 'ngo2', name: 'Green Earth', since: '2025-09-10', role: 'Helper' }
  ];
  res.render('volunteer/joined-ngos', { volunteer: req.user, joined });
});

const getNotifications = catchAsync(async (req, res) => {
  const notifications = [
    { title: 'Task updated', message: 'Your task “Assist at food camp” is now In Progress.', timeAgo: '1h' },
    { title: 'Welcome!', message: 'Thanks for joining Green Earth.', timeAgo: '2d' }
  ];
  res.render('volunteer/notifications', { volunteer: req.user, notifications });
});

const getAccount = catchAsync(async (req, res) => {
  res.render('volunteer/account', { volunteer: req.user });
});

module.exports = {
  getDashboard,
  getAssignedTasks,
  getJoinedNgos,
  getNotifications,
  getAccount
};
