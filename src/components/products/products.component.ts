import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  ratingCount: number;
  isNew: boolean;
  inWishlist: boolean;
  imageUrl: string;
  departmentId: number;
}

interface Department {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  departmentId: number = 0;
  departmentName: string = 'جميع المنتجات';
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  departments: Department[] = [
   
    { id: 5, name: 'أدوات كهربائية' },
    { id: 6, name: 'الأدوات الصحية' },
    { id: 7, name: 'أدوات النجارة والأقفال' },
    { id: 8, name: 'العطور والكوزمتكس' }
  ];
  
  searchTerm: string = '';
  sortOption: string = 'default';
  
  currentPage: number = 1;
  itemsPerPage: number = 8;
  hasMoreProducts: boolean = true;
  
  // For generating star rating
  readonly stars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const deptId = params['departmentId'];
      this.departmentId = deptId ? +deptId : 0;
      this.loadProducts();
    });
  }

  // Fetch products by department or all products
  loadProducts(): void {
    this.setDepartmentName(this.departmentId);
    this.products = this.getMockProducts().filter(p => 
      this.departmentId === 0 || p.departmentId === this.departmentId
    );
    this.applyFilters();
  }

  // Apply search and sorting filters
  applyFilters(): void {
    // Case-insensitive search
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort products based on selected option
    switch(this.sortOption) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ratingDesc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default:
        // Default sorting can be by ID or featured status
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }

    // Apply pagination
    this.handlePagination();
  }

  // Handle pagination
  handlePagination(): void {
    const totalProducts = this.filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / this.itemsPerPage);
    
    // Determine if there are more products to load
    this.hasMoreProducts = this.currentPage < totalPages;
    
    // Limit products to current page
    if (this.currentPage < totalPages) {
      this.filteredProducts = this.filteredProducts.slice(0, this.currentPage * this.itemsPerPage);
    }
  }

  // Load more products
  loadMoreProducts(): void {
    this.currentPage++;
    this.applyFilters();
  }

  // Set department name based on the department ID
  setDepartmentName(departmentId: number): void {
    const dept = this.departments.find(d => d.id === departmentId);
    this.departmentName = dept ? dept.name : 'جميع المنتجات';
  }

  // Calculate discounted price
  getDiscountedPrice(product: Product): number {
    return product.discount > 0 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
  }

  // Calculate original price
  getOriginalPrice(product: Product): number {
    return product.discount > 0 
      ? product.price / (1 - product.discount / 100) 
      : product.price;
  }

  // Load all products (reset filters and department)
  loadAllProducts(): void {
    this.departmentId = 0;
    this.departmentName = 'جميع المنتجات';
    this.products = this.getMockProducts();
    this.applyFilters();
  }

  // Simulate fetching products (use a real API here)
  getMockProducts(): Product[] {
    return [
     
      
       
      { 
        id: 9, 
        name: 'قفل', 
        category: 'سلندرات واقفال', 
        description: 'قفل باب ', 
        price: 450, 
        discount: 0, 
        rating: 4.7, 
        ratingCount: 60, 
        isNew: false, 
        inWishlist: false, 
        imageUrl: '../../assets/doors-accessories-industrial_93675-3752.jpg',
        departmentId: 5 
      },
      
      
    
      { 
        id: 9, 
        name: 'مثقاب كهربائي', 
        category: 'أدوات كهربائية', 
        description: 'مثقاب قوي متعدد الاستخدامات', 
        price: 450, 
        discount: 5, 
        rating: 4.7, 
        ratingCount: 60, 
        isNew: true, 
        inWishlist: false, 
        imageUrl: '../../assets/view-3d-graphic-drill_23-2150849261.avif',
        departmentId: 5 
      },
      { 
        id: 10, 
        name: 'مفتاح إنجليزي', 
        category: 'أدوات النجارة والأقفال', 
        description: 'مفتاح متين لضبط البراغي', 
        price: 120, 
        discount: 0, 
        rating: 4.5, 
        ratingCount: 45, 
        isNew: false, 
        inWishlist: true, 
        imageUrl: '../../assets/top-view-different-types-wrenches_23-2148428252.avif',
        departmentId: 7 
      },
      { 
        id: 11, 
        name: 'حنفية مياه', 
        category: 'الأدوات الصحية', 
        description: 'حنفية عالية الجودة مقاومة للصدأ', 
        price: 250, 
        discount: 10, 
        rating: 4.3, 
        ratingCount: 30, 
        isNew: false, 
        inWishlist: false, 
        imageUrl: '../../assets/beautiful-modern-style-faucet-with-steel-sink-kitchen_181624-40744.avif',
        departmentId: 6 
      },
      { 
        id: 12, 
        name: 'عطر رجالي فاخر', 
        category: 'العطور والكوزمتكس', 
        description: 'عطر جذاب يدوم طويلاً', 
        price: 599, 
        discount: 15, 
        rating: 4.8, 
        ratingCount: 150, 
        isNew: true, 
        inWishlist: false, 
        imageUrl: '../../assets/6014990759498991545.jpg',
        departmentId: 8 
      }
    ];
  }

  // Add product to cart
  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    console.log('تم إضافة المنتج إلى السلة:', product);
    // Implement actual cart functionality here
  }

  // Toggle wishlist state
  toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    product.inWishlist = !product.inWishlist;
    console.log('تم تغيير حالة المفضلة للمنتج:', product);
    // Implement actual wishlist functionality here
  }

  // Show product details
  showProductDetails(product: Product): void {
    console.log('عرض تفاصيل المنتج:', product);
    // Implement navigation to product details page
  }

  // Optimized filtering with trackBy for better performance
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}