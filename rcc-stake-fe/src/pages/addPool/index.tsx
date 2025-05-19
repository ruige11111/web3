import LoadingButton from '@mui/lab/LoadingButton';
import { useStakeContract } from "../../hooks/useContract";
import { waitForTransactionReceipt } from "viem/actions";
import { useWalletClient } from "wagmi";
import { useState, useEffect } from "react";
import { formatUnits, zeroAddress } from "viem";

const AddPool = () => {

    const [loading, setLoading] = useState(false)
    const [poolLength, setPoolLength] = useState('0')

    const stakeContract = useStakeContract()

    const { data } = useWalletClient()

    const getPoolLength = async () => {
        const res = await stakeContract?.read.poolLength()
        setPoolLength(formatUnits(res as bigint, 0))
    }

    const handleAdd = async () => {
        if (!stakeContract || !data) return;

        try {
            setLoading(true)
            const tx = await stakeContract.write.addPool(['0xb45793C86eCC863a9fe36661E3eeb31519E88B34', 100, 100, 100, true])
            const res = await waitForTransactionReceipt(data, { hash: tx })
            console.log(res, 'tx')
            setLoading(false)
            getPoolLength()
          } catch (error) {
            setLoading(false)
            console.log(error, 'stake-error')
          }
    }

    useEffect(() => {
        getPoolLength()
    })

    return (
        <div>
            <h1>Pool Length：{poolLength}</h1>
            <LoadingButton variant='contained' loading={loading} onClick={handleAdd}>Add Pool</LoadingButton>
        </div>
    )
}

export default AddPool