import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { OrderSummary } from './types/OrderSummary';
import autoTable from 'jspdf-autotable';

export const pdfGenerator = (order: OrderSummary): jsPDF => {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(16);
    doc.text('Resumo do Pedido', 14, 20);

    // Informações do Pedido
    doc.setFontSize(12);
    doc.text(`ID do Pedido: ${order.order_id}`, 14, 30);
    doc.text(`Cliente: ${order.customer_name}`, 14, 37);
    doc.text(`Telefone: ${order.customer_phone}`, 14, 44);
    doc.text(`Endereço: ${order.customer_address}`, 14, 51);
    doc.text(`Total: R$ ${order.total_amount}`, 14, 58);

    // Espaço para tabela
    doc.text('Produtos:', 14, 70);

    // Tabela de produtos
    const productRows = order.products.map((product) => [
        product.name,
        product.code,
        `R$ ${product.value}`,
        product.quantity.toString(),
        `R$ ${product.price}`
    ]);

    autoTable(doc, {
        head: [['Nome', 'Código', 'Valor Unitário', 'Quantidade', 'Subtotal']],
        body: productRows,
        startY: 75,
    });

    return doc;
}