import axios from 'axios'

export const ContractService = {
  async getABI(contractAddress: string) {
    try {
      const res = await axios.get(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`
      )
      if (res.data.status === '1') {
        return JSON.parse(res.data.result)
      } else {
        throw new Error('ABI not found or invalid contract address')
      }
    } catch (err) {
      console.error('Error fetching ABI:', err)
      throw err // Re-throw the error to propagate it to the caller
    }
  }
}
