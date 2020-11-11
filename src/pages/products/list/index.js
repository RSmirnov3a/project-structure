import ProductForm from "../../../components/product-form";
import SortableTable from '../../../components/sortable-table';
import header from '../../dashboard/bestsellers-header';

export default class Page {
  element;
  subElements = {};
  components = {};

  constructor() {
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.pageTemplate;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);

    this.initComponents();
    this.renderComponents();
    this.initEventListeners();

    return this.element;
  }

  getSubElements(element) {
    const subElements = {};

    for (const subElement of element.querySelectorAll('[data-element]')) {
      subElements[subElement.dataset.element] = subElement;
    }

    return subElements;
  }

  get pageTemplate() {
    return `
      <div class="products-list">
        <div class="content__top-panel">
          <h1 class="page-title">Товары</h1>
          <a href="/products/add" class="button-primary">Добавить товар</a>
        </div>
        <div data-element="productsContainer" class="products-list__container"></div>
      </div>
    `;
  }

  initComponents() {
    this.components.productsContainer = new SortableTable(header, {
      sorted : 'title',
      url: `api/rest/products`
    });
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const { element } = this.components[component];
      const root = this.subElements[component];
      root.append(element);
    });
  }

  initEventListeners() {

  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
