﻿export default function Footer() {
    return (
        <footer className="bg-pink-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Heavenly Bakes</h3>
                        <p>123 Bake Street, Bake Town, ST6 1NG</p>
                        <p>Phone: 07391775642</p>
                        <p>Email: info@heavenlybakes.com</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                        <p>Monday - Friday: 9am - 6pm</p>
                        <p>Saturday: 10am - 4pm</p>
                        <p>Sunday: Closed</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-pink-600 hover:text-pink-800">Facebook</a>
                            <a href="#" className="text-pink-600 hover:text-pink-800">Instagram</a>
                            <a href="#" className="text-pink-600 hover:text-pink-800">Twitter</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Heavenly Bakes. All rights reserved.
                </div>
            </div>
        </footer>
    )
}