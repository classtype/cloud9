cd node_modules

call git clone https://github.com/ajaxorg/jsDAV
cd jsDAV
call git remote add w https://github.com/nightwing/jsDAV
call git fetch w
call git reset w/windows --hard
call npm install
cd ..

call git clone https://github.com/c9/vfs
cd vfs
call git remote add w https://github.com/nightwing/vfs
call git fetch w
call git reset w/windows --hard
call npm install
cd ..


call git clone https://github.com/c9/vfs-architect
cd vfs-architect
call git remote add w https://github.com/nightwing/vfs-architect
call git fetch w
call git reset w/windows --hard
call npm install
cd ..


call npm install formidable

pause