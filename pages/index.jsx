import { useState } from "react";

import Card from "src/components/Card";
import Table from "src/components/Table";
import Button from "src/components/Button";
import Modal from "src/components/Modal";
import WithdrawModal from "src/components/WithdrawModal";
import TopBar from "src/components/TopBar";
import SupplyModal from "src/components/SupplyModal";
import { useBaseContext } from "src/context/BaseContext";
import { getETHBalance, getaTokenBalance } from "src/utils/index";
import useWindowSize from "src/hooks/useWindowSize";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("withdraw");
  const { width } = useWindowSize();

  const { balance, walletAddress, aTokenBalance, chainNotSupported } =
    useBaseContext();
  return (
    <>
      <div className="relative">
        <div className="h-[35vh] bg-primary-2 w-screen"></div>
        <div className=" inset-0  absolute flex flex-col space-y-5   px-[10vw] top-[3vh]">
          <TopBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card
              title="Your Deposits"
              amount={`${
                width < 600 ? (+aTokenBalance).toFixed(2) : aTokenBalance
              } ETH`}
              buttonText="Withdraw"
              handleClick={() => {
                setModalType("withdraw");
                setShowModal(true);
              }}
              buttonDisabled={
                !walletAddress || aTokenBalance == 0 || chainNotSupported
              }
            />
            <Card
              title="Wallet Balance"
              amount={`${width < 600 ? (+balance).toFixed(2) : balance} ETH`}
              buttonText="Deposit"
              handleClick={() => {
                setModalType("supply");
                setShowModal(true);
              }}
              buttonDisabled={
                !walletAddress || balance == 0 || chainNotSupported
              }
            />
          </div>
          <Table />
          <div className="py-2" />
        </div>
      </div>

      <Modal setShowModal={setShowModal} showModal={showModal}>
        {modalType == "withdraw" ? (
          <WithdrawModal />
        ) : (
          <SupplyModal setShowModal={setShowModal} />
        )}
      </Modal>
    </>
  );
}

export default HomePage;
