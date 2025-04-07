<?php
require_once __DIR__ . '/UserDao.php';
require_once __DIR__ . '/ProductDao.php';
require_once __DIR__ . '/OrderDao.php';
require_once __DIR__ . '/CategoryDao.php';
require_once __DIR__ . '/ReviewDao.php';

// Initialize all DAOs
$userDao = new UserDao();
$productDao = new ProductDao();
$orderDao = new OrderDao();
$categoryDao = new CategoryDao();
$reviewDao = new ReviewDao();

echo "=== USER TESTS ===\n";
// Test UserDao
$users = $userDao->get_all();
echo "All users:\n";
print_r($users);

$testUser = $userDao->get_by_id(1);
echo "\nUser with ID 1:\n";
print_r($testUser);

// Add user
$userId = $userDao->add([
    'username' => 'testuser',
    'email' => 'test@example.com',
    'password' => 'hashed_password'
]);

// Update user
$userDao->update($userId, [
    'username' => 'updateduser',
    'email' => 'updated@example.com',
    'password' => 'new_password'
]);

// Delete user
$userDao->delete($userId);
// Delete with default user_id column
$userDao->delete(1); 

// Delete with explicit column name
$userDao->delete(1, 'user_id');

echo "\n=== PRODUCT TESTS ===\n";
// Test ProductDao
$products = $productDao->get_all();
echo "All products:\n";
print_r($products);

$testProduct = $productDao->get_by_id(1);
echo "\nProduct with ID 1:\n";
print_r($testProduct);

$newProductId = $productDao->add("Test Product", "Test Description", 19.99, 1);
echo "\nAdded new product with ID: $newProductId\n";

$updateSuccess = $productDao->update($newProductId, "Updated Product", "Updated Desc", 29.99, 1);
echo "\nUpdate result: " . ($updateSuccess ? "Success" : "Failed") . "\n";

$deleteSuccess = $productDao->delete($newProductId);
echo "Delete result: " . ($deleteSuccess ? "Success" : "Failed") . "\n";

echo "\n=== ORDER TESTS ===\n";
// Test OrderDao
$orders = $orderDao->get_all();
echo "All orders:\n";
print_r($orders);

$testOrder = $orderDao->get_by_id(1);
echo "\nOrder with ID 1:\n";
print_r($testOrder);

$newOrderId = $orderDao->add(1, "pending", 99.99);
echo "\nAdded new order with ID: $newOrderId\n";

$updateSuccess = $orderDao->update($newOrderId, 1, "completed", 109.99);
echo "\nUpdate result: " . ($updateSuccess ? "Success" : "Failed") . "\n";

$deleteSuccess = $orderDao->delete($newOrderId);
echo "Delete result: " . ($deleteSuccess ? "Success" : "Failed") . "\n";

echo "\n=== CATEGORY TESTS ===\n";
// Test CategoryDao
$categories = $categoryDao->get_all();
echo "All categories:\n";
print_r($categories);

$testCategory = $categoryDao->get_by_id(1);
echo "\nCategory with ID 1:\n";
print_r($testCategory);

$newCategoryId = $categoryDao->add("Test Category");
echo "\nAdded new category with ID: $newCategoryId\n";

$updateSuccess = $categoryDao->update($newCategoryId, "Updated Category");
echo "\nUpdate result: " . ($updateSuccess ? "Success" : "Failed") . "\n";

$deleteSuccess = $categoryDao->delete($newCategoryId);
echo "Delete result: " . ($deleteSuccess ? "Success" : "Failed") . "\n";

echo "\n=== REVIEW TESTS ===\n";
// Test ReviewDao
$reviews = $reviewDao->get_all();
echo "All reviews:\n";
print_r($reviews);

$testReview = $reviewDao->get_by_id(1);
echo "\nReview with ID 1:\n";
print_r($testReview);

$newReviewId = $reviewDao->add(1, 1, 5, "Great product!");
echo "\nAdded new review with ID: $newReviewId\n";

$updateSuccess = $reviewDao->update($newReviewId, 4, "Actually very good");
echo "\nUpdate result: " . ($updateSuccess ? "Success" : "Failed") . "\n";

$deleteSuccess = $reviewDao->delete($newReviewId);
echo "Delete result: " . ($deleteSuccess ? "Success" : "Failed") . "\n";