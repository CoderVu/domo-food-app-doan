import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import AppHeader from "../components/common/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/common/AppText";
import Button from "../components/common/Button";
import { colors } from "../theme/colors";
import Quantity from "../components/Quantity/Quantity";
import MiniCard from "../components/MiniCard/MiniCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../components/Redux/Action/productActions";

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetail);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const [quantity, setQuantity] = useState(2);

  const increaseQuantity = () => setQuantity((quantity) => quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price); // 'vi-VN' là định dạng cho Việt Nam
  };
  // Calculate the total price based on quantity and combo price
  const totalPrice = product.price * quantity;
  return (
    <Screen>
      <AppHeader title="Chi tiết sản phẩm" customTitleStyles={styles.headerTitle} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${product.image}` }}
            style={styles.image}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.productTitleContainer}>
            <AppText text={product.productName} customStyles={styles.productTitle} />
            <AppText
              text={`(${product.averageRate} Reviews)`}
              customStyles={styles.reviewsText}
            />
          </View>

          <View style={styles.priceAndQuantityContainer}>
            <Quantity
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <AppText
              text={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              customStyles={[styles.productPrice, { marginRight: 10 }]}
            />

          </View>

          <View style={styles.directionRowSpaceBetween}>
            <MiniCard icon={"star"} title={(product?.averageRate || 0).toString()} subtitle={"Rating"} />
            <MiniCard icon={"camera"} title={(product?.photos || 0).toString()} subtitle={"Photos"} />
          </View>

          <View style={styles.detailsContainer}>
            <AppText text="Mô tả" customStyles={styles.sectionTitle} />
            <AppText text={product.description} customStyles={styles.productDescription} />
          </View>

          <View style={styles.totalPriceContainer}>
            <AppText text={`Tổng cộng: ${formatPrice(totalPrice)} đ`} customStyles={styles.totalPriceText} />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label="Thêm vào giỏ"
              customStyles={styles.addToCartButton}
              customLabelStyles={styles.addToCartButtonLabel}
            />
            <Button
              label="Thanh toán ngay"
              customStyles={styles.buyNowButton}
              customLabelStyles={styles.buyNowButtonLabel}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerImageContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    width: "90%",
    height: 250,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  body: {
    flex: 0.6,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
  },
  productTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productTitle: {
    fontFamily: "Lato-Black",
    fontSize: 22,
    color: colors.black,
  },
  reviewsText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.gray,
  },
  priceAndQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  productPrice: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  totalPriceContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  totalPriceText: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10, // Add some padding to make it more compact
  },

  addToCartButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "40%",  // Adjust width to make the button smaller
    paddingVertical: 12,  // Decrease padding to make the button smaller
    borderRadius: 8, // Optionally, reduce the border radius for a sharper look
  },

  buyNowButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "40%",  // Adjust width to make the button smaller
    paddingVertical: 12,  // Decrease padding to make the button smaller
    borderRadius: 8,  // Optionally, reduce the border radius for a sharper look
  },

  addToCartButtonLabel: {
    textAlign: "center",
    fontSize: 16,  // Adjust font size for the smaller button
    color: colors.white,
  },

  buyNowButtonLabel: {
    textAlign: "center",
    fontSize: 16,  // Adjust font size for the smaller button
    color: colors.white,
  },
  headerTitle: {
    marginLeft: "30%",
  },
});

export default ProductDetails;
