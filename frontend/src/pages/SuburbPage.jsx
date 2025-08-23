import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const SuburbPage = () => {
    const { suburb } = useParams(); 
    const suburbName = suburb.charAt(0).toUpperCase() + suburb.slice(1);

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <motion.div
                className="bg-red-500 text-white py-16 px-6 text-center mt-25 sm:mt-35"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Mobile Tyre Services in {suburbName}
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Fast, reliable, and onsite tyre services
                </p>
            </motion.div>

            {/* Intro Section */}
            <motion.section
                className="py-12 px-6 max-w-5xl mx-auto text-gray-800"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-bold mb-4">
                    Looking for trusted mobile tyre services in <span className="text-red-600 text-2xl">{suburbName}?</span>
                </h2>
                <p className="mb-4">
                    At <span className="font-semibold">Aussie Mobile Tyres Shop</span>, we bring expert tyre solutions
                    directly to your location—whether you're at home, work, or on the road. Our team is fully equipped
                    to handle everything from tyre replacements to repairs, using top-tier tools and industry-leading techniques.
                </p>
                <p className="mb-4">
                    We proudly serve the <strong>{suburbName}</strong> community with fast, friendly, and professional tyre
                    services designed to keep you moving safely. Whether you need onsite tyre fitting, fleet tyre maintenance,
                    or a quick puncture repair, we’re here to help 7 days a week. Our commitment is to deliver hassle-free
                    and affordable mobile tyre solutions wherever you are in {suburbName}.
                </p>
                <p>
                    From individual vehicles to business fleets, we ensure prompt response and quality workmanship.
                    Your safety and convenience are our priority. So, if you’re searching for mobile tyre repair {suburbName},
                    tyre fitting near me, or any tyre-related help, <span className="font-semibold">Aussie Mobile Tyres Shop</span>
                    is your go-to local expert.
                </p>
            </motion.section>

            {/* Services Section */}
            <motion.section
                className="bg-gray-50 py-12 px-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Image */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={"https://img.freepik.com/free-photo/dirt-wheel-mechanic-holding-tire-repair-garage-replacement-winter-summer-tires_146671-16778.jpg"}
                            alt="Mobile Tyre Services"
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            Our Mobile Tyre Services in <span className="text-red-600 text-2xl">{suburbName}</span>
                        </h2>
                        <p className="mb-6 text-gray-700">
                            We provide a complete range of onsite and mobile tyre services across {suburbName}:
                        </p>

                        <motion.div
                            className="space-y-4 text-gray-700"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.2 } }
                            }}
                        >
                            {[
                                { title: "Tyre Sales", desc: "Choose from a wide range of quality tyres for all vehicle types. We stock all major brands at competitive prices, delivered and fitted at your location." },
                                { title: "Onsite Tyre Fitting", desc: `No need to visit a garage—our mobile team comes to you. We provide professional tyre fitting at your home, workplace, or roadside anywhere in ${suburbName}.` },
                                { title: "Puncture Repairs", desc: "Flat tyre? Our expert technicians will assess and safely repair most punctures on the spot to get you back on the road quickly." },
                                { title: "Wheel Balancing & Rotations", desc: "Improve tyre lifespan and vehicle performance with our precision wheel balancing and tyre rotation services, all performed onsite." }
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="font-semibold text-lg mb-1 text-red-600">
                                        <span className="text-gray-900">{index + 1}.</span> {service.title}
                                    </h3>
                                    <p>{service.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
               
            <section className="py-16 bg-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Why Choose Aussie Mobile Tyres Shop in{" "}
                    <span className="text-red-600">{suburbName}</span>?
                </h2>
                <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
                    When it comes to mobile tyre services in {suburbName}, here’s why locals trust us:
                </p>

                {/* Desktop Layout */}
                <div className="hidden lg:flex relative justify-center items-center">
                    {/* Center Image */}
                    <div className="w-100 h-100 rounded-md overflow-hidden shadow-xl">
                        <img
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQbPnUP9hkvzUWusrp7IRfmcIQ83ySYpvfw&s"}
                            alt="Mobile Tyre Service"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Top Left */}
                    <div className="absolute -top-5 left-25 w-64">
                        <div className="p-4 bg-white shadow-md rounded-2xl text-right">
                            <h3 className="text-xl font-semibold text-red-600">1</h3>
                            <h4 className="font-bold">Local Experts You Can Trust</h4>
                            <p className="text-gray-600 text-sm">
                                We know {suburbName} inside and out. Our technicians are local,
                                qualified, and always ready to provide fast, friendly service.
                            </p>
                        </div>
                    </div>

                    {/* Top Right */}
                    <div className="absolute -top-5 right-25 w-64">
                        <div className="p-4 bg-white shadow-md rounded-2xl text-left">
                            <h3 className="text-xl font-semibold text-red-600">2</h3>
                            <h4 className="font-bold">Fully Mobile & Convenient</h4>
                            <p className="text-gray-600 text-sm">
                                Forget the hassle of tyre shops—we come to your location with all
                                the equipment needed to get the job done professionally.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Left */}
                    <div className="absolute -bottom-5 left-25 w-64">
                        <div className="p-4 bg-white shadow-md rounded-2xl text-right">
                            <h3 className="text-xl font-semibold text-red-600">3</h3>
                            <h4 className="font-bold">Affordable & Transparent Pricing</h4>
                            <p className="text-gray-600 text-sm">
                                We offer competitive pricing with no hidden fees. You'll always
                                know what you're paying for before any work begins.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Right */}
                    <div className="absolute -bottom-5 right-25 w-64">
                        <div className="p-4 bg-white shadow-md rounded-2xl text-left">
                            <h3 className="text-xl font-semibold text-red-600">4</h3>
                            <h4 className="font-bold">All-In-One Tyre Services</h4>
                            <p className="text-gray-600 text-sm">
                                From sales and fitting to repairs and recycling, we offer a
                                complete solution for all your tyre needs in {suburbName}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile / Tablet Layout */}
                <div className="lg:hidden flex flex-col gap-6 items-center mt-8 max-w-3xl mx-auto">
                    {/* First two cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="p-4 bg-white shadow-md rounded-2xl">
                            <h3 className="text-xl font-semibold text-red-600">1</h3>
                            <h4 className="font-bold">Local Experts You Can Trust</h4>
                            <p className="text-gray-600 text-sm">
                                We know {suburbName} inside and out. Our technicians are local,
                                qualified, and always ready to provide fast, friendly service.
                            </p>
                        </div>
                        <div className="p-4 bg-white shadow-md rounded-2xl">
                            <h3 className="text-xl font-semibold text-red-600">2</h3>
                            <h4 className="font-bold">Fully Mobile & Convenient</h4>
                            <p className="text-gray-600 text-sm">
                                Forget the hassle of tyre shops—we come to your location with all
                                the equipment needed to get the job done professionally.
                            </p>
                        </div>
                    </div>

                    {/* Image in between */}
                    <div className="w-64 h-64 rounded-md overflow-hidden shadow-xl">
                        <img
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQbPnUP9hkvzUWusrp7IRfmcIQ83ySYpvfw&s"}
                            alt="Mobile Tyre Service"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Last two cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="p-4 bg-white shadow-md rounded-2xl">
                            <h3 className="text-xl font-semibold text-red-600">3</h3>
                            <h4 className="font-bold">Affordable & Transparent Pricing</h4>
                            <p className="text-gray-600 text-sm">
                                We offer competitive pricing with no hidden fees. You'll always
                                know what you're paying for before any work begins.
                            </p>
                        </div>
                        <div className="p-4 bg-white shadow-md rounded-2xl">
                            <h3 className="text-xl font-semibold text-red-600">4</h3>
                            <h4 className="font-bold">All-In-One Tyre Services</h4>
                            <p className="text-gray-600 text-sm">
                                From sales and fitting to repairs and recycling, we offer a
                                complete solution for all your tyre needs in {suburbName}.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                className="bg-gray-100 py-12 px-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                
            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        FAQs – Tyre Services in <span className="text-red-600 text-2xl">{suburbName}</span>
                    </h2>
                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold">1.Do you provide emergency mobile tyre services in {suburbName}?</h3>
                            <p>Yes, we offer fast-response mobile tyre services across {suburbName}. Whether it’s a flat tyre or urgent replacement, we’re ready to help.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">2.Can I buy tyres from you and have them fitted onsite in {suburbName}?</h3>
                            <p>Absolutely! We offer tyre sales and onsite fitting across {suburbName} for cars, vans, 4WDs, and more.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">3.Do you offer fleet tyre services for businesses in {suburbName}?</h3>
                            <p>Yes, we work with local businesses to provide reliable fleet tyre maintenance and inspections on a schedule that suits you.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">4.How long does a mobile tyre fitting take in {suburbName}?</h3>
                            <p>Most mobile tyre fittings take between 30 to 60 minutes depending on your vehicle and number of tyres being replaced.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">5.Do you repair punctures onsite in {suburbName}?</h3>
                            <p>Yes, our technicians are trained to assess and repair most punctures safely onsite. If a repair isn't possible, we can replace the tyre on the spot.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">6.Is tyre recycling available in {suburbName}?</h3>
                            <p>We offer eco-friendly tyre recycling to ensure your old tyres are disposed of responsibly, right here in {suburbName}.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">7.Can I schedule tyre rotations or wheel balancing at my home in {suburbName}?</h3>
                            <p>Yes, we provide both tyre rotation and wheel balancing services onsite at your home or workplace in {suburbName}.</p>
                        </div>

                    </div>
                </div>
            </section>

            </motion.section>

            <Footer />
        </>
    );
};

export default SuburbPage;
