<nav id="sidebar" class="bg-dark text-white">
    <div class="sidebar-header bg-dark">
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
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fa fa-book mr-1"></i>
                PAGES
            </a>
            <ul class="collapse list-unstyled" id="pageSubmenu">
                <li>
                    <a href="#">Page 1</a>
                </li>
                <li>
                    <a href="#">Page 2</a>
                </li>
            </ul>
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