import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AppHeader from "../components/common/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/common/AppText";
import Button from "../components/common/Button";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchComboById } from "../components/Redux/Action/productActions";
import Quantity from "../components/Quantity/Quantity";
import MiniCard from "../components/MiniCard/MiniCard";

const ComboDetails = ({ route }) => {
  const { comboId } = route.params;
  const dispatch = useDispatch();
  const combo = useSelector((state) => state.product.comboDetail);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const [quantity, setQuantity] = useState(2);

  const increaseQuantity = () => setQuantity((quantity) => quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    dispatch(fetchComboById(comboId));
  }, [dispatch, comboId]);

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
  const totalPrice = combo?.price * quantity;

  return (
    <Screen>
      <AppHeader title="Chi tiết sản phẩm" customTitleStyles={styles.headerTitle} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${combo?.image}` }}
            style={styles.image}
            resizeMode="contain" // Maintain aspect ratio
          />
        </View>
        <View style={styles.body}>
          <View style={styles.comboTitleContainer}>
            <AppText text={combo?.comboName || 'Combo Name'} customStyles={styles.comboTitle} />
            <AppText
              text={`(${combo?.averageRate || 0} Reviews)`}
              customStyles={styles.reviewsText}
            />
          </View>

          <View style={styles.priceAndQuantityContainer}>
            <Quantity
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <AppText text={`${formatPrice(combo?.price || 0)} đ`} customStyles={styles.comboPrice} />
          </View>

          <View style={styles.directionRowSpaceBetween}>
            <MiniCard icon={"star"} title={(combo?.averageRate || 0).toString()} subtitle={"Rating"} />
            <MiniCard icon={"camera"} title={(combo?.photos || 0).toString()} subtitle={"Photos"} />
          </View>

          <View style={styles.detailsContainer}>
            <AppText text="Mô tả" customStyles={styles.sectionTitle} />
            <AppText text={combo?.description || 'No description available'} customStyles={styles.comboDescription} />
          </View>

          <View style={styles.productsContainer}>
            <AppText text="Sản phẩm" customStyles={styles.sectionTitle} />
            <ScrollView horizontal={true} style={styles.productList}>
              {combo?.products?.map((product, index) => (
                <TouchableOpacity key={index} style={styles.productCard}>
                  <Image
                    source={{ uri: `data:image/png;base64,${product.image}` }}
                    style={styles.productImage}
                    resizeMode="contain" // Maintain aspect ratio
                  />
                  <AppText text={product.productName} customStyles={styles.productName} />
                </TouchableOpacity>
              )) || <AppText text="No products available" customStyles={styles.textMedium} />}
            </ScrollView>
          </View>

          {/* Display total price separately */}
          <View style={styles.totalPriceContainer}>
            <AppText text={`Tổng cộng: ${formatPrice(totalPrice || 0)} đ`} customStyles={styles.totalPriceText} />
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

export default ComboDetails;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.lightGray,
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
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
  },
  comboTitleContainer: {
    marginBottom: 10,
  },
  comboTitle: {
    fontFamily: "Lato-Black",
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
  },
  reviewsText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.gray,
  },
  comboDescription: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 5,
    lineHeight: 24,
  },
  comboPrice: {
    fontFamily: "Lato-Bold",
    fontSize: 26,
    color: colors.primary,
    marginTop: 10,
    fontWeight: "700",
  },
  directionRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  productsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.black,
    marginBottom: 10,
  },
  productList: {
    flexDirection: "row",
    marginBottom: 20,
  },
  productCard: {
    marginRight: 15,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  productName: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
    marginTop: 5,
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