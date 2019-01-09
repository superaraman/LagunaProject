<nav id="sidebar" class="bg-gradient-vanusa">
    <div class="sidebar-header bg-gradient-vanusa text-white">
        <div class="ml-2">Laravel Practice</div>
    </div>

    <ul class="list-unstyled components">
        <li>
            <a href="/admin">
                <i class="fa fa-sliders mr-1"></i>
                DASHBOARD
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fa fa-book mr-1"></i>
                WATER DATA
            </a>
        </li>
        <li>
            <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fa fa-user-circle-o mr-1"></i>
                USERS
            </a>
            <ul class="collapse list-unstyled" id="userSubmenu">
                <li>
                    <a href="/admin/users/pendings">Pending Users</a>
                </li>
                <li>
                    <a href="/admin/users/verified">Employees</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="/admin/settings">
                <i class="fa fa-cogs mr-1"></i>
                SETTINGS
            </a>
        </li>
    </ul>
</nav>