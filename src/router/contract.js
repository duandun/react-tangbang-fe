const routers = [{
  name: 'contractAdd',
  path: '/contract/add',
  component: () => import('components/contract/contract')
}, {
  name: 'contractList',
  path: '/contract/list',
  component: () => import('components/contract/list')
}]

export default routers
