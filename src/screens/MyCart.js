import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsInCart, increaseOneQuantity, decreaseOneQuantity } from "../components/Redux/Action/userAction";
import { colors } from "../theme/colors";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { toast } from "react-toastify";

const MyCart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dataProducts, dataCombos, loading, error } = useSelector((state) => state.user);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, [dispatch]);

  const handleSelectItem = (item, type) => {
    const itemId = type === 'product' ? item.productId : item.comboId;
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const renderCartItem = ({ item, type }) => {
    const itemId = type === 'product' ? item.product.productId : item.combo.comboId;
    const cartId = item.cartId; // Lấy cartId từ item
    const quantity = type === 'product' ? item.product.quantity : item.combo.quantity; // Lấy số lượng hiện tại

    return (
      <TouchableOpacity onPress={() => handleSelectItem(item, type)} style={[styles.cartItem]}>
        <Image source={{ uri: `data:image/png;base64,${type === 'product' ? item.product.image : item.combo.image}` }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <View>
            <Text style={styles.productName}>{type === 'product' ? item.product.productName : item.combo.comboName}</Text>
            <Text style={styles.productPrice}>{type === 'product' ? item.product.unitPrice : item.combo.unitPrice} đ</Text>
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(cartId, quantity)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(cartId, quantity)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalPrice}>{(type === 'product' ? item.product.unitPrice * item.product.quantity : item.combo.unitPrice * item.combo.quantity)} đ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleIncreaseQuantity = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;

    // Cập nhật Redux store và backend
    dispatch(increaseOneQuantity(cartId, newQuantity));
    dispatch(fetchProductsInCart());  // Re-fetch giỏ hàng để đảm bảo dữ liệu đồng bộ
  };

  const handleDecreaseQuantity = (cartId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      // Cập nhật Redux store và backend
      dispatch(decreaseOneQuantity(cartId, newQuantity));
      dispatch(fetchProductsInCart());  // Re-fetch giỏ hàng để đảm bảo dữ liệu đồng bộ
    } else {
      console.log("Quantity cannot be less than 1");
    }
  };




  const getTotalPriceInCart = () => {
    let total = 0;
    for (let i = 0; i < dataProducts?.length; i++) {
      total += (dataProducts[i].product.unitPrice * dataProducts[i].product.quantity);
    }
    for (let i = 0; i < dataCombos?.length; i++) {
      total += (dataCombos[i].combo.unitPrice * dataCombos[i].combo.quantity);
    }
    return total;
  };

  const handlePlaceOrder = () => {
    if ((!dataProducts || dataProducts.length === 0) && (!dataCombos || dataCombos.length === 0)) {
      toast.error("Không có sản phẩm trong giỏ hàng!");
    } else {
      navigation.navigate("Checkout");
    }
  };

  const groupByStore = (data) => {
    return data.reduce((result, item) => {
      const storeName = item.product ? item.product.dataStore.storeName : item.combo.dataStore.storeName;
      if (!result[storeName]) {
        result[storeName] = [];
      }
      result[storeName].push(item);
      return result;
    }, {});
  };

  const sortedData = [...dataProducts, ...dataCombos].sort((a, b) => {
    const aCreatedAt = a.product ? a.product.createdAt : a.combo.createdAt;
    const bCreatedAt = b.product ? b.product.createdAt : b.combo.createdAt;
    return new Date(bCreatedAt) - new Date(aCreatedAt);
  });

  const groupedData = groupByStore(sortedData);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.keys(groupedData).map((storeName, index) => (
        <View key={index}>
          <Text style={styles.sectionTitle}>{storeName}</Text>
          <FlatList
            data={groupedData[storeName]}
            renderItem={({ item }) =>
              item.product ? renderCartItem({ item: item, type: 'product' }) : renderCartItem({ item: item, type: 'combo' })
            }
            keyExtractor={(item, index) => `${item.product ? item.product.productId : item.combo.comboId}-${index}`}
          />
        </View>
      ))}
      <View style={styles.cartTotal}>
        <Text style={styles.totalText}>Total: {getTotalPriceInCart()} đ</Text>
        <Button
          label="Proceed to Checkout"
          customStyles={styles.button}
          customLabelStyles={styles.buttonLabel}
          onPress={handlePlaceOrder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 20,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.red,
    fontSize: 18,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between'
  },
  selectedItem: {
    backgroundColor: colors.medium,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  productPrice: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.primary,
  },
  totalPrice: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  sectionTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.dark,
    marginVertical: 10,
  },
  emptyText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.medium,
    textAlign: "center",
    marginVertical: 20,
  },
  cartTotal: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.dark,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 20,
  },
  buttonLabel: {
    textAlign: "center",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  quantityButton: {
    fontSize: 18,
    color: colors.primary,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    color: colors.dark,
    paddingHorizontal: 10,
  },
});

export default MyCart;