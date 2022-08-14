import {  loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { expandToDecimals } from './utils'

describe('ERC20StanderdToken', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const name = 'ABC Private Ltd',
      symbol = 'ABC'

    const totalSupply = 10 ** 8
    const [owner, user1, user2] = await ethers.getSigners()

    const ERC20StanderdToken = await ethers.getContractFactory(
      'ERC20StanderdToken',
    )
    const erc20StanderdToken = await ERC20StanderdToken.deploy(
      owner.address,
      name,
      symbol,
      totalSupply,
    )

    return {
      erc20StanderdToken,
      owner,
      user1,
      user2,
      name,
      symbol,
      totalSupply,
    }
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { erc20StanderdToken, owner } = await loadFixture(deployContract)

      expect(await erc20StanderdToken.owner()).to.equal(owner.address)
    })

    it('Should mint right token value to the owner', async function () {
      const { erc20StanderdToken, owner, totalSupply } = await loadFixture(
        deployContract,
      )

      expect(await erc20StanderdToken.balanceOf(owner.address)).to.equal(
        expandToDecimals(totalSupply, 18),
      )
    })

    it('Should set right name, decimal, symbol, total supply', async function () {
      const {
        erc20StanderdToken,
        name,
        symbol,
        totalSupply,
      } = await loadFixture(deployContract)

      expect(await erc20StanderdToken.name()).to.equal(name)
      expect(await erc20StanderdToken.symbol()).to.equal(symbol)
      expect(await erc20StanderdToken.decimals()).to.equal(18)
      expect(await erc20StanderdToken.totalSupply()).to.equal(
        expandToDecimals(totalSupply, 18),
      )
    })
  })

  describe('Transfers', function () {
    it('Should transfer the funds from the owner to user1', async function () {
      const { erc20StanderdToken, owner, user1 } = await loadFixture(
        deployContract,
      )
      const amount = 10000
      await erc20StanderdToken
        .connect(owner)
        .transfer(user1.address, expandToDecimals(amount, 18))
      expect(await erc20StanderdToken.balanceOf(user1.address)).to.equal(
        expandToDecimals(amount, 18),
      )
    })

    it('Should transfer the funds from user1 to user2', async function () {
      const { erc20StanderdToken, owner, user1, user2 } = await loadFixture(
        deployContract,
      )
      const amount = 10000
      await erc20StanderdToken
        .connect(owner)
        .transfer(user1.address, expandToDecimals(amount, 18))

      await erc20StanderdToken
        .connect(user1)
        .transfer(user2.address, expandToDecimals(amount / 2, 18))

      expect(await erc20StanderdToken.balanceOf(user1.address)).to.equal(
        expandToDecimals(amount / 2, 18),
      )
      expect(await erc20StanderdToken.balanceOf(user2.address)).to.equal(
        expandToDecimals(amount / 2, 18),
      )
    })
  })

  describe('Events', function () {
    it('Should emit an event on token transfer', async function () {
      const { erc20StanderdToken, owner, user1 } = await loadFixture(
        deployContract,
      )
      const amount = 10000

      await expect(
        erc20StanderdToken
          .connect(owner)
          .transfer(user1.address, expandToDecimals(amount, 18)),
      )
        .to.emit(erc20StanderdToken, 'Transfer')
        .withArgs(owner.address, user1.address, expandToDecimals(amount, 18)) // We accept any value as `when` arg
    })
  })
})
