import userService from './userService';

const wishlistService = {
  // Membuat kunci penyimpanan unik berdasarkan ID User
  getKey() {
    const user = userService.getUser();
    if (!user) return null; // Jika belum login, tidak punya key
    return `wishlist_${user.id}`; // Contoh: "wishlist_123"
  },

  getWishlist() {
    const key = this.getKey();
    if (!key) return []; // Jika guest, kembalikan list kosong
    
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  isWishlisted(accountId) {
    const list = this.getWishlist();
    return list.some(item => item.id === accountId);
  },

  toggleWishlist(account) {
    const key = this.getKey();
    if (!key) return false; // Safety check: Guest tidak bisa simpan

    let list = this.getWishlist();
    const index = list.findIndex(item => item.id === account.id);

    let isAdded = false;

    if (index === -1) {
      // Belum ada, tambahkan
      list.push(account);
      isAdded = true;
    } else {
      // Sudah ada, hapus
      list.splice(index, 1);
      isAdded = false;
    }

    // Simpan kembali ke localStorage user tersebut
    localStorage.setItem(key, JSON.stringify(list));
    return isAdded;
  }
};

export default wishlistService;