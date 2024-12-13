document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCategories();

    document.getElementById('product-form').addEventListener('submit', handleProductFormSubmit);
    document.getElementById('category-form').addEventListener('submit', handleCategoryFormSubmit);
});

function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productTableBody = document.getElementById('product-table').querySelector('tbody');
            productTableBody.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.weight}</td>
                    <td>${product.price}</td>
                    <td>${product.category.name}</td>
                    <td>
                        <button onclick="showProductDetails(${product.id})">Details</button>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        });
}

function loadCategories() {
    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryTableBody = document.getElementById('category-table').querySelector('tbody');
            categoryTableBody.innerHTML = '';
            const categorySelect = document.getElementById('product-category');
            categorySelect.innerHTML = '';
            categories.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>${category.code}</td>
                    <td>
                        <button onclick="editCategory(${category.id})">Edit</button>
                        <button onclick="deleteCategory(${category.id})">Delete</button>
                    </td>
                `;
                categoryTableBody.appendChild(row);

                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        });
}

function showProductForm() {
    document.getElementById('product-form-modal').style.display = 'block';
}

function closeProductForm() {
    document.getElementById('product-form-modal').style.display = 'none';
}

function showCategoryForm() {
    document.getElementById('category-form-modal').style.display = 'block';
}

function closeCategoryForm() {
    document.getElementById('category-form-modal').style.display = 'none';
}

function handleProductFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = {
        name: formData.get('name'),
        weight: formData.get('weight'),
        price: formData.get('price'),
        index: formData.get('index'),
        category: { id: formData.get('category') }
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            closeProductForm();
        });
}

function handleCategoryFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = {
        name: formData.get('name'),
        code: formData.get('code')
    };

    fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(() => {
            loadCategories();
            closeCategoryForm();
        });
}

function showProductDetails(id) {
    // Implement product details view
}

function editProduct(id) {
    // Implement product edit functionality
}

function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
        .then(() => loadProducts());
}

function editCategory(id) {
    // Implement category edit functionality
}

function deleteCategory(id) {
    fetch(`/api/categories/${id}`, {
        method: 'DELETE'
    })
        .then(() => loadCategories());
}