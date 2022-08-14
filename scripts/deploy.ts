import { ethers } from 'hardhat'

const main = async () => {
  const [owner] = await ethers.getSigners()
  const ERC20StanderdToken = await ethers.getContractFactory(
    'ERC20StanderdToken',
  )
  const erc20StanderdToken = await ERC20StanderdToken.deploy(
    owner.address,
    'ABC Private Ltd',
    'ABC',
    10 ** 8,
  )

  await erc20StanderdToken.deployed()

  console.log('ERC20StanderdToken deployed to:', erc20StanderdToken.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
