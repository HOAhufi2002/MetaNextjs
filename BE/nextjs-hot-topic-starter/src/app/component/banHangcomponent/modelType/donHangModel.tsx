'use client'
export interface Item {
  idSanPham: number;
  tenSanPham: string;
  idLoai: number;
  gia: number;
  ngayDat: Date;
  tongTien: number; 
  soLuong : number;
  chiTietDonHangs: { idSanPham: number }[]; // New property
}
