 = Get-Content 'd:\themefores\reak\assets\js\custom-roya.js' -Raw
 = .Substring(0, .IndexOf('/* Extracted Inline Scripts */', .IndexOf('/* Extracted Inline Scripts */') + 1))
Set-Content 'd:\themefores\reak\assets\js\custom-roya.js' 

 = Get-Content 'd:\themefores\reak\assets\css\roya-homepage.css' -Raw
 = .Substring(0, .IndexOf('/* Extracted Inline Styles */', .IndexOf('/* Extracted Inline Styles */') + 1))
Set-Content 'd:\themefores\reak\assets\css\roya-homepage.css' 
