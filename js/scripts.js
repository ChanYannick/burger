var meals = [
	{
		name: "Super cheesy burger",
		description: "Discover our great cheesy burger with mozzarella, gorgonzola and pecorino",
		price: 8.5,
		veggie: true
	},
    {
		name: "Pulled pork burger",
		description: "BBQ pulled pork blah blahb blah",
		price: 12.75,
		veggie: false
	},
	{
		name: "Bad beef burger",
		description: "Full of angry beef, jalapeno peppers, fried onions and our special BBQ sauce",
		price: 12,
		veggie: false
	}
];
var meals2 = []

        
    $.getJSON('https://wt-902485dbb4fca4fccee3a0efcde5b34c-0.run.webtask.io/foodmenu', function (response) {
        $.each($.parseJSON(response), function(idx, rec){
       
           
            meals2.push({name : rec.name, description : rec.description, price : rec.price, veggie : rec.veggie})
          
         
        })
    });console.log(meals , meals2);


//création de la table avec les articles
meals.forEach(function(e, i){

//vérification si le produit est veggie
    var vegg = "";
    if(e.veggie == true){
        vegg = "<img src='img/vege-icon.png'>";
    }
    
    
    var $newMeal = $("<tr data-price='"+e.price+"' data-qty='0' class='priceAll'><td><strong>" + e.name + "</strong>&nbsp;"+ vegg +"<p>" + e.description +"</p></td><td><span class='price' ><strong>\(0€\)</strong></span></td><td class='quantity'> 0 </td><td><button class='btn btn-primary more'>+</button><button class='btn btn-primary less'>-</button></td></tr>");
    $newMeal.appendTo(".table");
     
});

//création de la ligne TOTAL
$("<tr data-price='0' data-quantity='0' class='info'><td><strong>Total</strong></td><td><span ><strong>0€</strong></span></td><td>0</td><td></td></tr>").appendTo(".table");

$total = $("tr.info");


function verify(increment, $row, price, qty){
    var somme = qty * price;
    $row.find(".price strong").text(somme +"€");
    var totalPrice = $total.data("price");
    var totalQty = $total.data("quantity");
    if(increment){
        totalPrice = totalPrice + price;
        totalQty++;
    }
    else{
        totalPrice = totalPrice - price;
        totalQty--;
    }
    $total.data("price", totalPrice );
    $total.data("quantity",totalQty );
    
    console.log(totalPrice ,  totalQty);
    
$total.children().eq(1).children().text(totalPrice +"€");
    $total.children().eq(2).text(totalQty);
};

$(".more").click(function(){
    var $row = $(this).closest("tr");
    var qty = $row.data("qty");
    var price = $row.data("price");
    $row.data("qty", ++qty);
    //qty = qty +1;
    $row.find(".quantity").text(qty);
    
    verify(true,$row, price, qty);
    
});

$(".less").click(function(){
    var $row = $(this).closest("tr");
    var qty = $row.data("qty");
    var price = $row.data("price");
    if(qty >= 1){
        $row.data("qty", --qty);
        $row.find(".quantity").text(qty);
        verify(false,$row, price, qty);
    }
});

/*var totalPrice = $("tr.priceAll").text();
$(".priceTotal strong").text(totalPrice);*/
