const abi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'Decrement',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'Increment',
    type: 'event'
  },
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'decrement', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'getCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'increment', outputs: [], stateMutability: 'nonpayable', type: 'function' }
]

export default abi
