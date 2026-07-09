import AdminLayout from "../../components/admin/AdminLayout";

import {
  AdminProvider,
} from "../../context/AdminContext";

import {
  AdminUIProvider,
} from "../../context/AdminUIContext";

function AdminShell() {

  return (

    <AdminProvider>

      <AdminUIProvider>

        <AdminLayout />

      </AdminUIProvider>

    </AdminProvider>

  );

}

export default AdminShell;