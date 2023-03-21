import React, { useState } from 'react'
import { BiDollarCircle } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { RiWallet3Line } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import images from '../../assets';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdCopy } from 'react-icons/io';
import { Routes } from '../../routes/Routes';
import { useAppDispatch } from '../../store/redux-hooks/hooks';
import { updatePaymentMethod } from '../../store/features/business/business.actions';

export interface PaymentMethodType {
  method: '' | 'cash' | 'crypto',
  cashType: 'paypal' | 'credit-card' | '',
  creditCardType: 'american-express' | 'master-card' | 'visa' | '',
  cryptoType: 'near' | 'bitcoin' | 'usdc'
}

export default function SurveysPaymentMethodSelection() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>({
    method: '',
    cashType: '',
    creditCardType: '',
    cryptoType: 'near'
  });
  const [modalStep, setModalStep] = useState<'' | 'payment-added-confirm' | 'first' | 'second' | 'third' | 'success'>('');
  const [activatedPaymentMethodSelectionForm, setActivatedPaymentMethodSelectionForm] = useState<"method" | "cash" | "crypto" | "credit-card" | "">("method");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"" | "paypal" | "visa" | "american-express" | "master-card" | "near" | "bitcoin" | "usdc">("");

  const handleNext = async () => {
    if (activatedPaymentMethodSelectionForm === "method") {
      if (paymentMethod.method === "cash") setActivatedPaymentMethodSelectionForm("cash");
      else setActivatedPaymentMethodSelectionForm("crypto");
    }

    else if (activatedPaymentMethodSelectionForm === "cash" && paymentMethod.cashType === "credit-card") {
      setActivatedPaymentMethodSelectionForm("credit-card");
    }

    else if (paymentMethod.cashType === "paypal") {
      // TODO: Paypal Payment Integration
      setSelectedPaymentMethod("paypal");
      dispatch(updatePaymentMethod({ method: "paypal" }));
    }
    else if (paymentMethod.creditCardType === "visa" || paymentMethod.creditCardType === "american-express" || paymentMethod.creditCardType === "master-card") {
      // TODO: Credit Card Payment Integration
      setSelectedPaymentMethod(paymentMethod.creditCardType);
      dispatch(updatePaymentMethod({ method: paymentMethod.creditCardType }));
    }
    else if (paymentMethod.cryptoType === "near" || paymentMethod.cryptoType === "bitcoin" || paymentMethod.cryptoType === "usdc") {
      // TODO: Blockchain Integration
      setSelectedPaymentMethod(paymentMethod.cryptoType);
      await dispatch(updatePaymentMethod({ method: paymentMethod.cryptoType }));
      setModalStep('payment-added-confirm');
    }
  }

  const handleCancel = () => {
    if (activatedPaymentMethodSelectionForm === "method") {
      setPaymentMethod(pre => ({ ...pre, method: "" }));
    } else if (activatedPaymentMethodSelectionForm === "cash") {
      setPaymentMethod(pre => ({ ...pre, cashType: "" }));
      setActivatedPaymentMethodSelectionForm("method");
    } else if (activatedPaymentMethodSelectionForm === "credit-card") {
      setPaymentMethod(pre => ({ ...pre, creditCardType: "" }));
      setActivatedPaymentMethodSelectionForm("cash");
    } else if (activatedPaymentMethodSelectionForm === "crypto") {
      setPaymentMethod(pre => ({ ...pre, cryptoType: "near" }));
      setActivatedPaymentMethodSelectionForm("method");
    }
  }

  return (
    <>
      <div className="container mx-auto py-2" >
        <button
          className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
          onClick={() => navigate(Routes.SURVEY_LIST)}
        >
          <HiArrowLongLeft />
          Back
        </button>
      </div>
      <div className='container px-[140px] max-sm:px-4 py-20 mx-auto'>
        {
          activatedPaymentMethodSelectionForm === "method" ? <div>
            <p className='text-base font-[500] mb-1'> <span className='font-normal text-[#3772FF]'>02 </span>Fund your survey</p>
            <div className='border-t-[1px]'>
              <p className='text-base font-[500] text-[#777E91] p-5'>WWhat’s your favorite payment method to find your survey?</p>
              <div className='flex flex-wrap justify-center gap-2 mt-15'>
                <button
                  className={'w-[415px] h-[469px] max-sm:w-full bg-white border-[1px] p-8 cursor-pointer' + (paymentMethod.method === "cash" ? " border-[#3772FF]" : "")}
                  onClick={() => setPaymentMethod(pre => ({ ...pre, method: 'cash' }))}
                >
                  <img src={images.cash} alt="Cash" className='mx-auto' />
                  <p className='text-[25px] font-poppins-black text-center mt-2'>Cash</p>
                  <div className='mt-8 text-[12px] text-left flex flex-col gap-5 items-start'>
                    <p className='text-[#777E91] h-[70px]'>This is the traditional funding method which allows a business to connect their PayPal and/or credit card to offer fiat (cash) rewards for users upon completion</p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>01 </span>We currently accept Visa, MasterCard, American Express and PayPal.</p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>02 </span>Learn more about our financial capabilities,<span className='text-[#3772FF]'> here</span></p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>02 </span>Learn more about our Terms and Conditions,<span className='text-[#3772FF]'> here</span></p>
                  </div>
                </button>
                <button
                  className={'w-[415px] h-[469px] max-sm:w-full bg-white border-[1px] p-8 cursor-pointer' + (paymentMethod.method === "crypto" ? " border-[#3772FF]" : "")}
                  onClick={() => setPaymentMethod(pre => ({ ...pre, method: 'crypto' }))}
                >
                  <img src={images.crypto} alt="Crypto" className='mx-auto' />
                  <p className='text-[25px] font-poppins-black text-center mt-2'>Crypto</p>
                  <div className='mt-8 text-[12px] text-left flex flex-col gap-5 items-start'>
                    <p className='text-[#777E91] h-[70px]'>This is our advanced funding method which requires an existing wallet, experience with blockchain and transferring tokens in order to load rewards for users to claim upon completion</p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>01 </span>We currently only allow users to send NEAR and NEP related tokens as a reward (e.g. nUSDC, nBTC, nETH)</p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>02 </span>Learn more about NEAR and their ecosystem,<span className='text-[#3772FF]'> here</span></p>
                    <p className='font-[500]'><span className='text-[#3772FF]'>02 </span>Learn more about creating a wallet on NEAR,<span className='text-[#3772FF]'> here</span></p>
                  </div>
                </button>
              </div>
            </div>
          </div>
            :
            (activatedPaymentMethodSelectionForm === "cash" || activatedPaymentMethodSelectionForm === "credit-card") ? <div>
              <p className='text-base font-[500] mb-1'> <span className='font-normal text-[#3772FF]'>03 </span>select your funding ressources</p>
              <div className='border-t-[1px]'>
                <p className='text-base font-[500] text-[#777E91] p-5'>you can choose to pay with paypal or credit card</p>
                <div className='flex flex-wrap justify-center items-start gap-2 mt-15'>
                  <div className='flex flex-col justify-center items-center w-[270px] max-sm:w-full p-8 cursor-pointer'>
                    <img src={images.cash} alt="Cash" className='mx-auto h-[194px] w-auto' />
                    <p className='text-[17px] font-poppins-bold text-center mt-2 flex gap-1 items-center'>Cash <BsArrowRight /> </p>
                  </div>
                  {activatedPaymentMethodSelectionForm === "cash" ? <div className='flex flex-col w-[415px] max-sm:w-full p-8 gap-2'>
                    <button
                      className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.cashType === "paypal" ? " border-[#3772FF]" : "")}
                      onClick={() => setPaymentMethod(pre => ({ ...pre, cashType: 'paypal' }))}
                    >
                      <div className='flex justify-center items-center w-[46px] h-[46px] bg-[#9757D7] rounded-full mr-8'>
                        <BiDollarCircle color='white' />
                      </div>
                      <p className='text-[15px] font-poppins-bold '>paypal</p>
                      <BsArrowRight className='absolute right-10' />
                    </button>
                    <button
                      className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.cashType === "credit-card" ? " border-[#3772FF]" : "")}
                      onClick={() => setPaymentMethod(pre => ({ ...pre, cashType: 'credit-card' }))}
                    >
                      <div className='flex justify-center items-center w-[46px] h-[46px] bg-[#45B26B] rounded-full mr-8'>
                        <RiWallet3Line color='white' />
                      </div>
                      <p className='text-[15px] font-poppins-bold '>credit card</p>
                      <BsArrowRight className='absolute right-10' />
                    </button>
                  </div> : activatedPaymentMethodSelectionForm === "credit-card" ? <div className='flex flex-col w-[415px] max-sm:w-full p-8 gap-2'>
                    <button
                      className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.creditCardType === "american-express" ? " border-[#3772FF]" : "")}
                      onClick={() => setPaymentMethod(pre => ({ ...pre, creditCardType: 'american-express' }))}
                    >
                      <div className='flex justify-center items-center ml-12'>
                        <img src={images.creditCards.americanExpress} alt="American Express" />
                      </div>
                      <BsArrowRight className='absolute right-10' />
                    </button>
                    <button
                      className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.creditCardType === "master-card" ? " border-[#3772FF]" : "")}
                      onClick={() => setPaymentMethod(pre => ({ ...pre, creditCardType: 'master-card' }))}
                    >
                      <div className='flex justify-center items-center ml-12'>
                        <img src={images.creditCards.masterCard} alt="Master Card" />
                      </div>
                      <BsArrowRight className='absolute right-10' />
                    </button>
                    <button
                      className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.creditCardType === "visa" ? " border-[#3772FF]" : "")}
                      onClick={() => setPaymentMethod(pre => ({ ...pre, creditCardType: 'visa' }))}
                    >
                      <div className='flex justify-center items-center ml-12'>
                        <img src={images.creditCards.visa} alt="Visa" />
                      </div>
                      <BsArrowRight className='absolute right-10' />
                    </button>
                  </div> : <></>}
                </div>
              </div>
            </div>
              :
              activatedPaymentMethodSelectionForm === "crypto" ? <div>
                <p className='text-base font-[500] mb-1'> <span className='font-normal text-[#3772FF]'>03 </span>select your funding ressources</p>
                <div className='border-t-[1px]'>
                  <p className='text-base font-[500] text-[#777E91] p-5'>you can choose to pay with paypal or credit card</p>
                  <div className='flex flex-wrap justify-center items-start gap-2 mt-15'>
                    <div className='flex flex-col justify-center items-center w-[270px] max-sm:w-full p-8 cursor-pointer'>
                      <img src={images.crypto} alt="Cash" className='mx-auto h-[194px] w-auto' />
                      <p className='text-[17px] font-poppins-bold text-center mt-2 flex gap-1 items-center'>Crypto <BsArrowRight /> </p>
                    </div>
                    <div className='flex flex-col w-[415px] max-sm:w-full p-8 gap-2'>
                      <button
                        className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.cryptoType === "near" ? " border-[#3772FF]" : "")}
                        onClick={() => setPaymentMethod(pre => ({ ...pre, cryptoType: 'near' }))}
                      >
                        <img src={images.nearToken} alt="Near Protocol Coin" className='w-[60px]' />
                        <p className='text-[15px] font-poppins-bold '>Near</p>
                        <BsArrowRight className='absolute right-10' />
                      </button>
                      <button
                        className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.cryptoType === "bitcoin" ? " border-[#3772FF]" : "")}
                        onClick={() => setPaymentMethod(pre => ({ ...pre, cryptoType: 'bitcoin' }))}
                      >
                        <img src={images.bitcoinToken} alt="Bitcoin" className='w-[60px]' />
                        <p className='text-[15px] font-poppins-bold ' >Bitcoin</p>
                        <BsArrowRight className='absolute right-10' />
                      </button>
                      <button
                        className={'flex items-center relative bg-white border-[1px] rounded-md w-full h-[90px] px-12' + (paymentMethod.cryptoType === "usdc" ? " border-[#3772FF]" : "")}
                        onClick={() => setPaymentMethod(pre => ({ ...pre, cryptoType: 'usdc' }))}
                      >
                        <img src={images.usdcToken} alt="Bitcoin" className='w-[60px]' />
                        <p className='text-[15px] font-poppins-bold '>USDC</p>
                        <BsArrowRight className='absolute right-10' />
                      </button>
                    </div>
                  </div>
                </div>
              </div> : <></>
        }
        <div className='flex justify-end gap-5 mt-10'>
          <button
            className="border-[#e6e8ec] font-segoe-ui text-sm border-2 px-6 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            onClick={handleCancel}
          >
            Back
          </button>
          <button
            className="bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 px-12 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {
        modalStep === 'payment-added-confirm' ? <div className='w-screen h-screen bg-[#000000cb] fixed top-0'>
          <div className="flex flex-col items-center justify-center h-full">
            <div className='flex flex-col relative items-center w-[448px] h-[302px] rounded-3xl bg-white p-10'>
              <button
                className='flex justify-center items-center border-2 w-[40px] h-[40px] rounded-full absolute right-10'
                onClick={() => setModalStep('')}
              >
                <IoClose size={'25px'} />
              </button>
              <div className='flex justify-center items-center w-[50px] h-[50px] bg-[#9757D7] rounded-full mt-10'>
                <AiOutlineInfoCircle color='white' size={'20px'} />
              </div>
              <p className='text-[13px] text-center font-poppins-bold my-6'>You can always add/change your payment method from your profile settings.</p>
              <button
                className="absolute bottom-5 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                onClick={() => {
                  if (paymentMethod.cryptoType == 'near' && activatedPaymentMethodSelectionForm == "crypto") setModalStep('first');
                }}
              >
                ok
              </button>
            </div>
          </div>
        </div>
          : <></>
      }

      {
        (modalStep != '' && modalStep != 'payment-added-confirm' && modalStep != 'success') ? <div className='w-screen h-screen bg-[#000000cb] fixed top-0'>
          <div className="flex flex-col items-center justify-center h-full">
            <div className='flex flex-col relative items-center w-[448px] min-h-[610px] rounded-3xl bg-white '>
              <div className='grid grid-cols-2 w-full h-[80px] text-[25px] font-poppins-black border-b-[1px]'>
                <div className='bg-[#F2F3F5] text-center pt-6 border-r-[1px] rounded-tl-3xl'>Send</div>
                <div className='text-center pt-6'>Receive</div>
              </div>
              {
                modalStep === 'first' ? <>
                  <div className='flex justify-center items-center w-[80px] h-[80px] bg-[#9757D7] rounded-full mt-10'>
                    <RiWallet3Line color='white' size={'25px'} />
                  </div>
                  <p className='text-base text-center text-[#777E91] font-[500] mt-16 px-8'>You are sending to the NEAR Network - This address can only receive tokens from the NEAR network. Do not send tokens from other networks, ERC-20s, or NFTs, or they may be lost. We have a separate page, later in the process, to create an NFT reward with your survey.</p>
                  <button
                    className="absolute bottom-20 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('second')}
                  >
                    I understand, continue
                  </button>
                  <button
                    className="absolute bottom-5 font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('')}
                  >
                    Cancel
                  </button>
                </> : modalStep === 'second' ? <>
                  <div className='flex justify-center items-center w-[50px] h-[50px] bg-[#F04C74] rounded-full mt-10'>
                    <RiWallet3Line color='white' size={'20px'} />
                  </div>
                  <p className='text-base font-[500] text-[#F04C74] mt-2'>warning</p>
                  <p className='text-base text-center bg-[#FEF4F6] text-[#F04C74] font-normal mx-10 mt-6 p-4'>you are about to authorize a transaction to an independent smart contract which we cannot reverse. Once funds are transferred, QSTN nor its affiliates are responsible for the funds and cannot retrieve them on your behalf. These smart contracts have been audited by __________.</p>
                  <button
                    className="absolute bottom-20 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('third')}
                  >
                    Next
                  </button>
                  <button
                    className="absolute bottom-5 font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('')}
                  >
                    Cancel
                  </button>
                </> : modalStep === 'third' ? <div className='h-[730px]'>
                  <div className='flex flex-col items-center justify-center'>
                    <img src={images.qrCode} alt="QR Code" className='mt-5 mb-10' />
                    <div className='flex justify-between w-full mb-2'>
                      <p className='text-[#777E91]'>Account ID</p>
                      <p className='flex items-center'>qstn.near<IoMdCopy className='cursor-pointer' /></p>
                    </div>
                    <div className='flex justify-between w-full mb-3 pb-2 border-b-[1px]'>
                      <p className='text-[#777E91]'>Balance due</p>
                      <p>20 Near</p>
                    </div>
                    <div className='flex justify-between w-full mb-3 pb-2'>
                      <p className='text-[#777E91]'>Stauts</p>
                      <p className='text-[#3772FF]'>Not completed</p>
                    </div>
                  </div>

                  <button
                    className="absolute bottom-20 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('success')}
                  >
                    Next
                  </button>
                  <button
                    className="absolute bottom-5 font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                    onClick={() => setModalStep('')}
                  >
                    Cancel
                  </button>
                </div> : <></>
              }

            </div>
          </div>
        </div> : <></>
      }
      {
        modalStep === 'success' ? <div className='w-screen h-screen bg-[#000000cb] fixed top-0'>
          <div className="flex flex-col items-center justify-center h-full">
            <div className='flex flex-col relative items-center w-[448px] min-h-[471px] rounded-3xl bg-white p-8'>
              <p className='text-5xl font-bold font-segoe-ui -tracking-wider'>Yay! 🎉</p>
              <p className='text-center font-[500] mt-16'>Congratulations,<br /> you successfully funded your contract!</p>
              <div className='bg-[#ECF7F0] p-4 mt-8 m-2'>
                <p className='text-base text-[#45B36B]'>Click, Next, to begin creating questions, NFTs and eventually publish your survey!</p>
              </div>
              <button
                className="absolute bottom-20 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                onClick={() => {
                  setPaymentMethod({
                    method: '',
                    cashType: '',
                    creditCardType: '',
                    cryptoType: 'near'
                  });
                  setActivatedPaymentMethodSelectionForm("method");
                  setModalStep('');
                  navigate(Routes.UPLOAD_MEDIA, {
                    state: {
                      nftPrize: true
                    }
                  });
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
          : <></>
      }

    </>
  )
}
