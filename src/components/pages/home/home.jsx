import { Link, useNavigate  } from "react-router-dom";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faAddressBook, faUserPlus, faUser, faHouse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import CardHome from "../../layouts/cards/cardHome";
import CardProfile from "../../layouts/cards/cardProfile";
import CardContact from "../../layouts/cards/cardContact";
import CardRegister from "../../layouts/cards/cardRegister";


function Home() {
    const [selectedSection, setSelectedSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const changeSectionToDirectory = () => {

        setSelectedSection('directory');
    };
    const handleLogout = () => {
        Cookies.remove('id');
        navigate("/");
    };
    const changeSectionToAddContact = () => {
        setSelectedSection('addContact');
      };

    return (
        <div>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-[280px_1fr] w-full">
                <div className="lg:hidden fixed top-4 left-4 z-20">
                    <button onClick={toggleMenu} className="p-2 bg-blue-600 text-white rounded">
                        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} /> {menuOpen ? "Cerrar" : "Menu"}
                    </button>
                </div>
                {menuOpen && <div className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden" onClick={toggleMenu}></div>}
                <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-blue-100 dark:bg-blue-800 lg:static lg:w-auto lg:border-r ${menuOpen ? 'block' : 'hidden'} lg:block`}>
                    <div className="flex h-full max-h-screen flex-col">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <button className="lg:hidden text-blue-800 dark:text-blue-200" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <div className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 text-center">
                                    Mi Directorio
                                </div>
                            <nav className="grid items-start px-4 text-sm font-medium">
                                
                                <Link 
                                    onClick={() => { setSelectedSection('home'); toggleMenu(); }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-800 dark:hover:text-blue-200 ${selectedSection === 'home' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'text-blue-700 dark:text-blue-300'}`}
                                ><FontAwesomeIcon icon={faHouse} /> Inicio</Link>
                                <Link 
                                    onClick={() => { setSelectedSection('directory'); toggleMenu(); }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-800 dark:hover:text-blue-200 ${selectedSection === 'directory' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'text-blue-700 dark:text-blue-300'}`}
                                ><FontAwesomeIcon icon={faAddressBook} /> Mis contactos</Link>
                                <Link 
                                    onClick={() => { setSelectedSection('addContact'); toggleMenu(); }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-800 dark:hover:text-blue-200 ${selectedSection === 'addContact' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'text-blue-700 dark:text-blue-300'}`}
                                ><FontAwesomeIcon icon={faUserPlus} /> Agregar Contactos</Link>
                                <Link 
                                    onClick={() => { setSelectedSection('profile'); toggleMenu(); }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-800 dark:hover:text-blue-200 ${selectedSection === 'profile' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'text-blue-700 dark:text-blue-300'}`}
                                ><FontAwesomeIcon icon={faUser} /> Mi perfil</Link>
                            </nav>
                        </div>
                        <div className="px-4 py-2 ml-auto">
                            <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:text-red-600" style={{fontWeight: 'bold'}}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Salir</button>
</div>
                    </div>
                </div>

                <div className="flex flex-col pt-16 lg:pt-0">
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                            {selectedSection === 'home' && (
                                <CardHome onViewContacts={changeSectionToDirectory} />
                            )}
                            {selectedSection === 'directory' && (
                                <CardContact onViewAddContact={changeSectionToAddContact} />
                            )}
                            {selectedSection === 'addContact' && (
                                <CardRegister/>
                            )}
                            {selectedSection === 'profile' && (
                                <CardProfile/>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;