import { Box, Typography, TextField } from "@mui/material"
import { useState, useEffect, useCallback } from "react";
import { useAccount, useWalletClient, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoadingButton from '@mui/lab/LoadingButton';
import { useStakeContract, useLPRContract } from "../../hooks/useContract";
import { Pid } from "../../utils";
import { formatUnits, parseUnits } from "viem";
import { LPRContractAddress, StakeContractAddress } from "../../utils/env"
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "viem/actions";

const Home = () => {
  const [stakedAmount, setStakedAmount] = useState('0')
  const [amount, setAmount] = useState('0')
  const [loading, setLoading] = useState(false)
  const [approveAmount, setApproveAmount] = useState('0')

  const { isConnected, address } = useAccount()

  const stakeContract = useStakeContract()

  const lprContract = useLPRContract()

  const { data } = useWalletClient()

  const { data: balance } = useBalance({
    address: address,
    token: LPRContractAddress
  })


  const handleStake = async () => {
    if (!stakeContract || !data) return;
    console.log(balance, amount, 'wallet');
    
    if (parseFloat(amount) > parseFloat(balance!.formatted)) {
      toast.error('Amount cannot be greater than current balance')
      return
    }

    try {
      setLoading(true)
      const tx = await stakeContract.write.deposit([1, parseUnits(amount, 18)])
      const res = await waitForTransactionReceipt(data, { hash: tx })
      console.log(res, 'tx')
      toast.success('Transaction receipt !')
      setLoading(false)
      getStakedAmount()
    } catch (error) {
      setLoading(false)
      console.log(error, 'stake-error')
    }

  }

  const handleApprove = async () => {
    if (!lprContract || !data) return;
    
    try {
      setLoading(true)
      const tx = await lprContract.write.approve([StakeContractAddress, parseUnits(approveAmount, 18)])
      const res = await waitForTransactionReceipt(data, { hash: tx })
      console.log(res, 'tx')
      toast.success('Transaction receipt !')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error, 'stake-error')
    }
  }

  const getStakedAmount = useCallback(async () => {
    if (address && stakeContract) {
      const res = await stakeContract?.read.stakingBalance([1, address])
      setStakedAmount(formatUnits(res as bigint, 18))
    }
  }, [stakeContract, address])

  useEffect(() => {
    if (stakeContract && address) {
      getStakedAmount()
    }
  }, [stakeContract, address])


  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>Rcc Stake</Typography>
      <Typography sx={{}}>Stake LPR to earn tokens.</Typography>
      <Box sx={{ border: '1px solid #eee', borderRadius: '12px', p: '20px', width: '600px', mt: '30px' }}>
        <Box display={'flex'} alignItems={'center'} gap={'5px'} mb='10px'>
          <Box>Staked Amount: </Box>
          <Box>{stakedAmount} LPR</Box>
        </Box>
        <TextField onChange={(e) => {
          setAmount(e.target.value)
        }} sx={{ minWidth: '300px' }} label="Amount" variant="outlined" />
        <Box mt='30px'>
          {
            !isConnected ? <ConnectButton /> : <LoadingButton variant='contained' loading={loading} onClick={handleStake}>Stake</LoadingButton>
          }
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #eee', borderRadius: '12px', p: '20px', width: '600px', mt: '30px' }}>
        <TextField onChange={(e) => {
          setApproveAmount(e.target.value)
        }} sx={{ minWidth: '300px' }} label="ApproveAmount" variant="outlined" />
        <Box mt='30px'>
          {
            !isConnected ? <ConnectButton /> : <LoadingButton variant='contained' loading={loading} onClick={handleApprove}>Approve</LoadingButton>
          }
        </Box>
      </Box>

    </Box>
  )
}

export default Home
