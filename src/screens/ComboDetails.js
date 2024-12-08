import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import AppHeader from "../components/common/AppHeader";
import Screen from "../components/Screen/Screen";
import AppText from "../components/common/AppText";
import Button from "../components/common/Button";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchComboById ,resetComboDetail} from "../components/Redux/Action/productActions";
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
    dispatch(resetComboDetail());
    dispatch(fetchComboById(comboId));
  }, [dispatch, comboId]);


  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Check if combo data exists
  if (!combo || !combo.price) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Calculate the total price based on quantity and combo price
  const totalPrice = combo.price * quantity;

  return (
    <Screen>
      <AppHeader title="Chi tiết sản phẩm" customTitleStyles={styles.headerTitle} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${combo.image}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.body}>
          <View style={styles.comboTitleContainer}>
            <AppText text={combo.comboName} customStyles={styles.comboTitle} />
            <AppText
              text={`(${combo.averageRate || 0} Reviews)`}
              customStyles={styles.reviewsText}
            />
          </View>

          <View style={styles.priceAndQuantityContainer}>
            <Quantity
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <AppText text={`${formatPrice(combo.price)} đ`} customStyles={styles.comboPrice} />
          </View>

          <View style={styles.directionRowSpaceBetween}>
            <MiniCard icon={"star"} title={(combo.averageRate || 0).toString()} subtitle={"Rating"} />
            <MiniCard icon={"camera"} title={(combo.photos || 0).toString()} subtitle={"Photos"} />
          </View>

          <View style={styles.detailsContainer}>
            <AppText text="Mô tả" customStyles={styles.sectionTitle} />
            <AppText text={combo.description || 'No description available'} customStyles={styles.comboDescription} />
          </View>

          <View style={styles.productsContainer}>
            <AppText text="Sản phẩm" customStyles={styles.sectionTitle} />
            <ScrollView horizontal={true} style={styles.productList}>
              {combo.products.length > 0 ? (
                combo.products.map((product, index) => (
                  <TouchableOpacity key={index} style={styles.productCard}>
                    <Image
                      source={{ uri: `data:image/png;base64,${product.image}` }}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                    <AppText text={product.productName} customStyles={styles.productName} />
                  </TouchableOpacity>
                ))
              ) : (
                <AppText text="No products available" customStyles={styles.textMedium} />
              )}
            </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  noDataText: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: colors.gray,
  },
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
    paddingHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "40%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyNowButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "40%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartButtonLabel: {
    textAlign: "center",
    fontSize: 16,
    color: colors.white,
  },
  buyNowButtonLabel: {
    textAlign: "center",
    fontSize: 16,
    color: colors.white,
  },
  headerTitle: {
    marginLeft: "30%",
  },
});

export default ComboDetails;
