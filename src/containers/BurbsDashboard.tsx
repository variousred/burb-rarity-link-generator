import React, { useEffect, useState } from "react";
import { Moralis } from 'moralis'
import { useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { _useResolveCall } from "react-moralis/lib/hooks/internal/_useResolveAsyncCall";
import {
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Link,
  Box,
  Heading,
  Divider
} from "@chakra-ui/react";

export const BurbsDashboard = (props) => {
  const [userNFTs, setUserNFTs] = useState<Array<String>>(['123', '456']);

  const [isLoading, setIsLoading] = useState(true)

  const { data, error, isLoading: moralisIsLoading } = useMoralisQuery("_User");

  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    console.log("running useEffect: ")
    if (data) {
      getUserNFTs()
    }
  }, [data]);

  const getUserNFTs = async () => {
    let chain: "polygon"
    chain = 'polygon'
    const address = data[0].attributes.accounts[0]
    const options = {
      chain: chain,
      address: address
    };

    const polygonNFTs = await Web3Api.account.getNFTs(options);

    if (polygonNFTs.result) {
      const burbNFTs = polygonNFTs.result.filter((el) => {
        return el.token_address === '0xe0c6ad7b53227ed95333d9e9f9f15deea4f7f12d'
      })
      const burbNFTTokenIds = burbNFTs.map((burb) => {
        return (burb.token_id)
      })
      setUserNFTs(burbNFTTokenIds)
      setIsLoading(false)
      return burbNFTTokenIds
    }
  }

  const generateRarityUrl = () => {
    let URL = "https://raritysniper.com/cryptoburbs";
    return URL + "?nftId=" + userNFTs.join("&nftId=");
  }

  return (
    <Box textAlign='center'>
          <Heading my={4}>Your Link, ser</Heading>
          <Heading size='md'>address: {data[0].attributes.accounts[0]}</Heading>
          <Heading size='md'>burbs found: {userNFTs.length}</Heading>

<Divider mb={4}/>
      {isLoading && <Button isLoading={isLoading}></Button>}
      {!isLoading && <Link href={generateRarityUrl()} isExternal>{generateRarityUrl()}</Link>}
    </Box>
  )

};
