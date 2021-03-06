import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from './useBlock'

// demo
// {
//     "msg": "success",
//     "code": 0,
//     "data": [
//         {
//             "APY": "1769.40",
//             "key": "WETH-Candy"
//         },
//         {
//             "APY": "7464032960289.86",
//             "key": "XYZ-GOLFF"
//         }
//     ]
// }
interface investmentAPY {
  APY: string,
  key: string
}
export const useInvestmentAPYs = () => {
  const [investmentAPYs, setInvestmentAPYs] = useState([] as investmentAPY[]);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get('/api/farms/getInvestmentAPY');
        setInvestmentAPYs(result.data.data);
      } catch(e) {
        console.log('fetchAPY error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchAPY()
  }, [fetchAPY]);

  return investmentAPYs
};
