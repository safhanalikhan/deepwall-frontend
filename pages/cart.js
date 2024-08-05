import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import EmptyCartIcon from "@/components/icons/emptyCart";
import Link from "next/link";
import NavigationHistory from "@/components/navigationHistory";
import Swal from "sweetalert2";

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 40px;
  // margin-top: 40px;
  box-sizing: border-box;
  @media screen and (min-width: 992px) {
    flex-wrap: nowrap;
  }
  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
`;

const ProductInfoCell = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 991px) {
    gap: 0rem;
  }
`;

const ProductImageBox = styled.div`
  // width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: felx-start;
  // border-radius: 0px;
  img {
    height: 100px;
    width: 70px;
  }
  @media screen and (max-width: 991px) {
    img {
      height: 140px;
      width: 100px;
    }
  }
`;

const ProductTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const DeleteThisProduct = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;

  i:hover {
    color: #d9121f;
    transition: 0.5s;
  }

  @media screen and (max-width: 991px) {
    width: fit-content !important;
    position: absolute;
    right: 0;
    margin-right: 0px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const ProductCount = styled.div`
  display: flex;
  border: 1px solid #00000050;
  width: fit-content;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartTable = styled.div`
  .cartHead {
    width: 100%;
  }
  .cartHead .cartHeadItems {
    font-size: 13px;
    font-weight: 500;
  }

  @media screen and (max-width: 991px) {
    .cartHead {
      justify-content: flex-end;
      // width:fit-content !important;
    }
    .cartHead .cartHeadItems {
      width: fit-content !important;
      flex: 0;
    }
  }
`;

const CartItem = styled.div`
  border-top: 1px solid #0000001f;
  border-bottom: 1px solid #0000001f;
  padding: 1rem 0;
  width: 100%;
  .cartItemDetail,
  .cartItemDetailImgSec {
    font-size: small;
  }

  .mediuym {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;
  }

  @media screen and (max-width: 991px) {
    position: relative;

    .cartItemDetailImgSec {
      width: fit-content !important;
    }
    .cartItemDetail {
      width: 100% !important;
      display: block;
    }
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearItem, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [customIds, setCustomIds] = useState(false);
  const [loading, setLoading] = useState(false);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [mongoIds, setMongoIds] = useState(false);


  useEffect(() => {

    getAllProducts()

    // if (customProduct) {
    //   console.log('customProduct', customProduct)
    //   setProducts((prev) => [...prev, customProduct]);
    // }

  }, [cartProducts]);


  async function getAllProducts() {
    if (cartProducts.length > 0) {
      let allMongoIds = cartProducts.filter(i => !i?.includes('customId'))
      let allCustomIds = cartProducts.filter(i => i?.includes('customId'))
      setCustomIds(allCustomIds)
      setMongoIds(allMongoIds)
      console.log('allMongoIds', allMongoIds)
      console.log('customIds', customIds)
      await axios.post("/api/cart", { ids: allMongoIds }).then((response) => {
        console.log("response.data", response.data)
        setProducts(response.data);
      });
      if (ls && ls.getItem("customProducts")) {
        let customProductrReponse = JSON.parse(ls.getItem("customProducts"))
        console.log('customProductrReponse', customProductrReponse)
        let customProduct = customProductrReponse.filter(item => allCustomIds.includes(item._id))
        setProducts((prev) => [...prev, ...customProduct])
      }
    } else {
      setProducts([]);
    }

    return () => {
      console.log('Cleanup function called');
      // Perform any necessary cleanup here
    };
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  useEffect(() => {
    console.log(' products- - - - - -  - - - >', products)
  }, [products]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function removeThisProduct(id) {
    clearItem(id);
  }

  function removeAll() {
    clearCart();
  }

  const getData = async function (pair) {
    return new Promise(async function (resolve, reject) {
      let monitoringPayload = [];
      // let smsPayload = [];
      let tempEmails = [];

      if (type === "general") {
        console.log(
          "----------------->> general <<-----------------"
        );
        pair?.map((data, index) => {
          console.log(
            "----------------->>>",
            `${data?.userId} , ${discountId} , ${promoCodes?.[0]?.promoCodeId}`,
            "<<<-----------------"
          );

          if (!campaignId) {
            // copromocodes :nsole.log("monitoringPayload push")
            monitoringPayload.push({
              insertOne: {
                document: {
                  email: data?.email,
                  message,
                  // message: `${message} ${promoCodes?.[0]?.promoCode} on all stocks.Valid from 6th-9th July.`,
                  campaign: doc._id,
                  campaigns: [doc._id],
                  // campaign: "62d8d85a635bd030c8a52434",
                },
              },
            });

            if (!schedule && data?.email) {
              tempEmails.push(data?.email);
            }
          }

          let query;
          if (campaignType === "discount") {
            query = `INSERT INTO userdiscounts(userId, discountId, promocodeId) VALUES (${data?.userId},${discountId},${promoCodes?.[0]?.promoCodeId})`;
          } else if (campaignType === "offer") {
            query = `INSERT INTO useroffers(userId, offerId, promocodeId) VALUES (${data?.userId},${discountId},${promoCodes?.[0]?.promoCodeId})`;
          } else {
            query = `INSERT INTO userpromotions(userId, promotionId, promocodeId) VALUES (${data?.userId},${discountId},${promoCodes?.[0]?.promoCodeId})`;
          }
          queryFunc(query)
            .then((rows) => {
              // console.log(rows);
              // if (type !== "general") {
              //   const query2 = `UPDATE promocode SET isActive="FALSE" where promoCodeId="${promoCodes?.[0].promoCodeId}"`;
              //   queryFunc(query2).then((                    //   // , (err, rows2) => {
              //   //   console.log(rows2);
              //   //   return res.status(200).json({
              //   //     message: "Message Saved",
              //   //   });
              //   // });
              // }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "error please try again",
              });
            });
        });
      } else {
        promoCodes?.map((promocode, index) => {
          if (pair[index]) {
            if (!campaignId) {
              monitoringPayload.push({
                insertOne: {
                  document: {
                    phone: pair[index].email,
                    // message,
                    // message: `${message} ${promocode?.promoCode} on all stocks.Valid from 6th-9th July.`,
                    campaign: doc._id,
                    campaigns: [doc._id],
                    // campaign: "62d8d85a635bd030c8a52434",
                  },
                },
              });
            }
            // if (!schedule && channel == "sms") {
            //   smsPayload.push({
            //     insertOne: {
            //       document: {
            //         phone: pair[index].mobile,
            //         vendorId,
            //         message,
            //         campaign: doc._id,
            //         type,
            //         active: campaignStatus,
            //         // message: `${message} ${promocode?.promoCode} on all stocks.Valid from 6th-9th July.`,
            //       },
            //     },
            //   });
            // }

            // const campaignTypeArr = [
            //   userIds[pair[index]?.mobile],
            //   discountId,
            //   promocode.promoCodeId,
            // ];
            // if (campaignType === "discount") {
            //   campaignTypeQuery = `INSERT INTO userdiscounts(userId, discountId, promocodeId) VALUES ?`;
            // } else if (campaignType === "offer") {
            //   campaignTypeQuery = `INSERT INTO useroffers(userId, offerId, promocodeId) VALUES ?`;
            // } else {
            //   campaignTypeQuery = `INSERT INTO userpromotions(userId, promotionId, promocodeId) VALUES ?`;
            // }
            // campaignTypeArray.push(campaignTypeArr);

            if (type !== "general") {
              promoCodeIdsArray.push(promocode.promoCodeId);
            }
          }
        });
      }

      if (type !== "general") {
        const query2 = `UPDATE promocode SET isActive="FALSE" where promoCodeId in (${promoCodeIdsArray.toString()})`;
        queryFunc(query2)
          .then((d) => console.log("abc", d))
          .catch((err) => console.log("xyz", err));
      }

      console.log(
        "monitoringPayload.length",
        monitoringPayload.length
      );
      // console.log("smsPayload.length", smsPayload.length);
      // resolve(true);
      CampaignEmails.bulkWrite(monitoringPayload)
        .then(() => {
          console.log("CampaignEmails.bulkWrite");
          if (!schedule) {
            let emailStr = "EMAIL\n" + tempEmails.join("\n");
            // console.log("emailsString", emailsString);

            let apiInstance = new SibApiV3Sdk.ContactsApi();
            let requestContactImport =
              new SibApiV3Sdk.RequestContactImport();

            requestContactImport.fileBody = emailStr;
            requestContactImport.listIds = [listId];
            requestContactImport.emailBlacklist = false;
            requestContactImport.smsBlacklist = false;
            requestContactImport.updateExistingContacts = true;
            requestContactImport.emptyContactsAttributes = false;

            apiInstance
              .importContacts(requestContactImport)
              .then(
                function (resp) {
                  resolve(true);
                  console.log("Contact imported");
                },
                function (error) {
                  console.error(error);
                }
              );
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          CampaignEmails.deleteMany({
            campaign: doc._id,
          }).then((result) => { });
        });
    });
  };
  const recursionFuntion = async (data, count) => {
    await getData(data[count])
      .then((response) => {
        if (data?.length === count + 1) {
          if (!schedule) {
            console.log("All contacts imported ---------->");

            setTimeout(() => {
              let apiInstance =
                new SibApiV3Sdk.EmailCampaignsApi();
              let emailCampaigns =
                new SibApiV3Sdk.CreateEmailCampaign();
              emailCampaigns = {
                sender: {
                  name: vendorDetails?.emailVendors
                    ?.sendInBlue?.name,
                  email:
                    vendorDetails?.emailVendors?.sendInBlue
                      ?.email,
                },
                recipients: { listIds: [listId] },
                subject: `${subject}`,
                inlineImageActivation: false,
                sendAtBestTime: false,
                abTesting: false,
                ipWarmupEnable: false,
                name: name,
                templateId: Number(templateId),
                scheduledAt: moment()
                  .add(1, "day")
                  .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
              };
              apiInstance
                .createEmailCampaign(emailCampaigns)
                .then(function (data) {
                  console.log(
                    "Email Campaign Created Successfully"
                  );
                  res.status(200).json({
                    message:
                      "Campaign Created!, Message Scheduled.",
                  });
                })
                .catch(function (error) {
                  console.error(error);
                });
            }, 8000);
          } else {
            res.status(200).json({
              message:
                "Campaign Created!, Message Scheduled.",
            });
          }
        } else {
          recursionFuntion(data, count + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function goToPayment() {
    if (!name ||
      !email ||
      !city ||
      !streetAddress ||
      !postalCode ||
      !country ||
      !cartProducts
    ) {
      console.log('Enter your details')
      Swal.fire({
        title: "Empty",
        text: "please enter complete details",
        icon: "warning"
      });
    } else {
      try {
        setLoading(true)
        if (customIds && customIds?.length > 0) {
          let filteredProducts = products.filter(item => customIds.includes(item._id))

          let count = 0;
          const getData = async function (pair) {
            return new Promise(async function (resolve, reject) {
              console.log('pair pair pair pair pair pair', pair)

              let { _id: _, ...rest } = pair
              let data = { ...rest, customId: pair._id }
              console.log('pair pair pair pair pair pair', data)
              let response = await axios.post('/api/customProduct', data);
              resolve(response)
            });
          };
          const recursionFuntion = async (data, count) => {
            await getData(data[count])
              .then(async (response) => {
                // console.log('response - - - ', response)
                if (data?.length === count + 1) {
                  const response = await axios.post("/api/checkout", {
                    name,
                    email,
                    city,
                    postalCode,
                    streetAddress,
                    country,
                    mongoIds,
                    customIds
                  });
                  if (response.data.message) {
                    // window.location = response.data.url;
                    // console.log('response.data.url', response.data.message)
                    Swal.fire({
                      title: "congratulation !",
                      text: response.data.message,
                      icon: "success"
                    });
                  }
                } else {
                  recursionFuntion(data, count + 1);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };

          recursionFuntion(filteredProducts, count)
        } else {
          const response = await axios.post("/api/checkout", {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            mongoIds,
            customIds
          });
          if (response.data.message) {
            // window.location = response.data.url;
            // console.log('response.data.url', response.data.message)
            Swal.fire({
              title: "congratulation !",
              text: response.data.message,
              icon: "success"
            });
          }
        }
      } catch (error) {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      } finally {
        setLoading(false)
      }



    }
  }


  let total = 0;
  if (products?.length > 0) {
    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId)?.price || 0;
      total += price;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <div>
      {/* <Header />s */}
      <Center>
        <NavigationHistory />
        <ColumnsWrapper className="row">
          <Box
            className={
              !cartProducts?.length
                ? "col-12 pb-0 mx-lg-0 mx-3"
                : "col-lg-7 col-xl-8 pb-0 mb-lg-0 mb-5 mx-lg-0 mx-3"
            }
          >
            <h2>Shopping Cart</h2>
            {!cartProducts?.length && (
              <div className="empty_cart">
                {/* <i className="bi bi-bag "></i> */}
                <EmptyCartIcon className="icon" />
                <p className="mt-3"> Your cart is currently empty. </p>
                <Link
                  href="/products"
                  className="py-2 rounded-pill mt-3 px-3 button"
                >
                  Return to shop
                </Link>
              </div>
            )}
            {products?.length > 0 && (
              <CartTable>
                <div className="row  cartHead ">
                  <div className="cartHeadItems py-3 col-5  text-center">
                    Product
                  </div>
                  <div className="cartHeadItems py-3 col">Price</div>
                  <div className="cartHeadItems py-3 col">Quantity</div>
                  <div className="cartHeadItems py-3 col">Subtotal</div>
                </div>
                <div className="row ">
                  {products.map((product) => (
                    <CartItem
                      className=" row align-items-center"
                      key={product._id}
                    >
                      <ProductInfoCell className="cartItemDetailImgSec col-lg-5 ">
                        <DeleteThisProduct
                          className="d-none d-lg-block"
                          onClick={() => removeThisProduct(product._id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </DeleteThisProduct>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        <ProductTitle className="d-none d-lg-block">
                          {product.title}
                        </ProductTitle>
                      </ProductInfoCell>
                      <div className="d-lg-none mediuym p-3">
                        <ProductTitle className="cartItemDetail col d-lg-none">
                          {product.title}
                        </ProductTitle>

                        <div className="cartItemDetail col">
                          <i className="bi bi-currency-dollar"></i>
                          {product?.price}
                        </div>
                        <div className="cartItemDetail col">
                          <ProductCount className="ProductCount btn rounded-pill">
                            <div
                              className="px-2 "
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              <i className="bi bi-dash-lg"></i>
                            </div>
                            <div className="px-3">
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </div>
                            <div
                              className="px-2"
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              <i className="bi bi-plus-lg"></i>
                            </div>
                          </ProductCount>
                        </div>
                        <div className="cartItemDetail col ">
                          <i className="bi bi-currency-dollar"></i>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </div>
                      </div>

                      <div className="cartItemDetail d-none d-lg-block col">
                        <i className="bi bi-currency-dollar"></i>
                        {product?.price}
                      </div>
                      <div className="cartItemDetail d-none d-lg-block col">
                        <ProductCount className="ProductCount btn rounded-pill">
                          <div
                            className="px-2 "
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </div>
                          <div className="px-3">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </div>
                          <div
                            className="px-2"
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            <i className="bi bi-plus-lg"></i>
                          </div>
                        </ProductCount>
                      </div>
                      <div className="cartItemDetail d-none d-lg-block col ps-3">
                        <i className="bi bi-currency-dollar"></i>
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </div>
                      <DeleteThisProduct
                        className="d-block d-lg-none "
                        onClick={() => removeThisProduct(product._id)}
                      >
                        <i className="bi bi-x-lg"></i>
                      </DeleteThisProduct>
                    </CartItem>
                  ))}
                </div>
                <div className="row">
                  <div className="col-5" />
                  <div className="col" />
                  <div className="col" />
                  <div
                    className="pt-3 ps-0 pe-lg-0 pe-4 text-lg-start text-end col"
                    style={{ fontSize: "small" }}
                  >
                    <i className="bi bi-currency-dollar"></i>
                    {total}
                  </div>
                </div>
              </CartTable>
            )}
            {products?.length > 0 && (
              <div
                onClick={() => removeAll()}
                className=" px-1 empty-cart mt-5"
              >
                <button className="rounded-pill btn px-3"> Empty Cart </button>
              </div>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box className="col-lg-5 col-xl-4 place-order-box align-self-start">
              <h3>Order information</h3>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                className="rounded-4 order-details-input mb-3 px-3"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                className="rounded-4 order-details-input mb-3 px-3"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  className="rounded-4 order-details-input mb-3 px-3"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  className="rounded-4 order-details-input mb-3 px-3"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                className="rounded-4 order-details-input mb-3 px-3"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                className="rounded-4 order-details-input mb-3 px-3"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button
                black
                block
                onClick={goToPayment}
                className="rounded-4 mb-3 px-3"
              >
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </div>
  );
}
